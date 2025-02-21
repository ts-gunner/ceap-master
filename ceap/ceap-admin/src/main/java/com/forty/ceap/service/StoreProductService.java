package com.forty.ceap.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.forty.ceap.model.commerce.StoreProduct;
import com.forty.ceap.request.AddProductRequest;
import com.forty.ceap.request.GetStoreProductRequest;
import com.forty.ceap.vo.StoreProductVo;

import java.util.Map;

public interface StoreProductService extends IService<StoreProduct> {

    Page<StoreProductVo> getStoreProducts(GetStoreProductRequest request);

    Map<Integer, Integer> getProductBadge();

    void saveStoreProduct(AddProductRequest request);

    void offsellProduct(Integer productId);

    void upsellProduct(Integer productId);

    void recycleProduct(Integer productId, Boolean isRecycle);

}
