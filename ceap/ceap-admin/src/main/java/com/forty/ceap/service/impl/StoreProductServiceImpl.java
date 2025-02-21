package com.forty.ceap.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.forty.ceap.enums.ErrorCode;
import com.forty.ceap.enums.StoreProductTypeEnum;
import com.forty.ceap.exception.BusinessException;
import com.forty.ceap.mapper.StoreProductMapper;
import com.forty.ceap.model.commerce.StoreProduct;
import com.forty.ceap.request.AddProductRequest;
import com.forty.ceap.request.GetStoreProductRequest;
import com.forty.ceap.service.StoreProductService;
import com.forty.ceap.utils.SnowflakeIdGenerator;
import com.forty.ceap.vo.StoreProductVo;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class StoreProductServiceImpl extends ServiceImpl<StoreProductMapper, StoreProduct>
        implements StoreProductService {

    @Override
    public Page<StoreProductVo> getStoreProducts(GetStoreProductRequest request) {
        LambdaQueryWrapper<StoreProduct> queryWrapper = new LambdaQueryWrapper<>();
        if (request.getProductType().equals(StoreProductTypeEnum.ON_SALE.getProductType())){
            queryWrapper.eq(StoreProduct::getIsShow, true);
            queryWrapper.eq(StoreProduct::getIsRecycle, false);
            queryWrapper.gt(StoreProduct::getStock, 0);

        }
        else if (request.getProductType().equals(StoreProductTypeEnum.ON_STORE.getProductType())){
            queryWrapper.eq(StoreProduct::getIsShow, false);
            queryWrapper.eq(StoreProduct::getIsRecycle, false);
            queryWrapper.gt(StoreProduct::getStock, 0);
        }
        else if (request.getProductType().equals(StoreProductTypeEnum.SELL_OUT.getProductType())){
            queryWrapper.eq(StoreProduct::getIsRecycle, false);
            queryWrapper.eq(StoreProduct::getStock, 0);
        }
        else if (request.getProductType().equals(StoreProductTypeEnum.RECYCLE.getProductType())){
            queryWrapper.eq(StoreProduct::getIsRecycle, true);
        }

        Page<StoreProduct> storeProductPage = this.page(
                new Page<>(request.getCurrentPage(), request.getPageSize()),
                queryWrapper
        );

        Page<StoreProductVo> storeProductVoPage = new Page<>(request.getCurrentPage(), request.getPageSize());
        List<StoreProductVo> productVos = storeProductPage.getRecords().stream().map(it -> {
            StoreProductVo storeProductVo = new StoreProductVo();
            BeanUtils.copyProperties(it, storeProductVo);
            return storeProductVo;
        }).toList();
        storeProductVoPage.setRecords(productVos);
        storeProductVoPage.setTotal(storeProductPage.getTotal());
        return storeProductVoPage;
    }

    @Override
    public Map<Integer, Integer> getProductBadge() {
        return this.getBaseMapper().getProductBadgeCount();
    }

    @Override
    @Transactional(rollbackFor = BusinessException.class)
    public void saveStoreProduct(AddProductRequest request) {
        StoreProduct storeProduct = new StoreProduct();
        SnowflakeIdGenerator idGenerator = new SnowflakeIdGenerator(1);
        long merId = idGenerator.nextId();
        storeProduct.setMerId(String.valueOf(merId));
        storeProduct.setStoreName(request.getStoreName());
        storeProduct.setDescription(request.getDescription());
        storeProduct.setUnitName(request.getUnitName());
        storeProduct.setImage(request.getProductImage());
        storeProduct.setSliderImage("");
        storeProduct.setKeyword(request.getKeyword());
        storeProduct.setPrice(request.getPrice());
        storeProduct.setOtPrice(request.getOtPrice());
        storeProduct.setStock(request.getStock());
        storeProduct.setIsShow(request.getIsShow());
        storeProduct.setIsPostage(request.getIsPostage());
        this.save(storeProduct);

    }

    @Override
    @Transactional(rollbackFor = BusinessException.class)
    public void offsellProduct(Integer productId) {
        StoreProduct storeProduct = this.getById(productId);
        if (storeProduct == null){
            throw new BusinessException(ErrorCode.DATA_NOT_EXIST, "商品不存在");
        }
        if (storeProduct.getStock() == 0){
            throw new BusinessException(ErrorCode.PARAM_ERROR, "商品库存不足，无法上架与下架");
        }
        storeProduct.setIsShow(false);
        this.updateById(storeProduct);
    }

    @Override
    public void upsellProduct(Integer productId) {
        StoreProduct storeProduct = this.getById(productId);
        if (storeProduct == null){
            throw new BusinessException(ErrorCode.DATA_NOT_EXIST, "商品不存在");
        }
        if (storeProduct.getStock() == 0){
            throw new BusinessException(ErrorCode.PARAM_ERROR, "商品库存不足，无法上架与下架");
        }

        storeProduct.setIsShow(true);
        this.updateById(storeProduct);
    }

    @Override
    public void recycleProduct(Integer productId, Boolean isRecycle) {
        StoreProduct storeProduct = this.getById(productId);
        if (storeProduct == null){
            throw new BusinessException(ErrorCode.DATA_NOT_EXIST, "商品不存在");
        }
        // 移出回收站的时候将商品下架
        if (!isRecycle){
            storeProduct.setIsShow(false);
        }
        storeProduct.setIsRecycle(isRecycle);
        this.updateById(storeProduct);
    }
}
