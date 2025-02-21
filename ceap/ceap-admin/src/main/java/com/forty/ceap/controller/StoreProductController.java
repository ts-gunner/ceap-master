package com.forty.ceap.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.forty.ceap.model.commerce.StoreProduct;
import com.forty.ceap.request.AddProductRequest;
import com.forty.ceap.request.GetStoreProductRequest;
import com.forty.ceap.response.BaseResponse;
import com.forty.ceap.service.StoreProductService;
import com.forty.ceap.vo.StoreProductVo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/product")
@Tag(name="StoreProductController", description = "管理端商品服务")
public class StoreProductController {

    @Autowired
    StoreProductService storeProductService;

    @PreAuthorize("hasAuthority('admin:product:get')")
    @PostMapping("/get_products")
    @Operation(description = "管理员获取商品信息")
    public BaseResponse<Page<StoreProductVo>> getAdminProducts(@RequestBody GetStoreProductRequest request) {
        Page<StoreProductVo> storeProducts = storeProductService.getStoreProducts(request);
        return new BaseResponse<>(storeProducts);
    }

    @PreAuthorize("hasAuthority('admin:product:get')")
    @GetMapping("/get_product_tab_badge")
    @Operation(description = "获取商品标签头的数据量")
    public BaseResponse<Map<Integer, Integer>> getProductTabBadge(){

        Map<Integer, Integer> productBadge = storeProductService.getProductBadge();
        return new BaseResponse<>(productBadge);
    }

    @PreAuthorize("hasAuthority('admin:product:add')")
    @PostMapping("/add_products")
    @Operation(description = "管理员添加商品信息")
    public BaseResponse<Object> addProductInfo(@RequestBody AddProductRequest request){

        storeProductService.saveStoreProduct(request);
        return new BaseResponse<>();
    }


    @PreAuthorize("hasAuthority('admin:product:down')")
    @GetMapping("/offsell_products")
    @Operation(description = "下加商品")
    public BaseResponse<Object> offsellProduct(@RequestParam Integer productId){
        storeProductService.offsellProduct(productId);
        return new BaseResponse<>();
    }

    @PreAuthorize("hasAuthority('admin:product:up')")
    @GetMapping("/upsell_products")
    @Operation(description = "上架商品")
    public BaseResponse<Object> upsellProduct(@RequestParam Integer productId){
        storeProductService.upsellProduct(productId);
        return new BaseResponse<>();
    }

    @PreAuthorize("hasAuthority('admin:product:update')")
    @GetMapping("/recycle_product")
    @Operation(description = "商品移入移出回收站")
    public BaseResponse<Object> recycleProduct(@RequestParam Integer productId, @RequestParam Boolean isRecycle){
        storeProductService.recycleProduct(productId, isRecycle);
        return new BaseResponse<>();
    }
}
