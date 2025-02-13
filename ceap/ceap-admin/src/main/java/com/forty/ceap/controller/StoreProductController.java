package com.forty.ceap.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.forty.ceap.model.commerce.StoreOrder;
import com.forty.ceap.model.commerce.StoreProduct;
import com.forty.ceap.request.GetStoreOrderRequest;
import com.forty.ceap.request.GetStoreProductRequest;
import com.forty.ceap.response.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/product")
@Tag(name="StoreProductController", description = "管理端商品服务")
public class StoreProductController {

    @PreAuthorize("hasAuthority('admin:product:get')")
    @PostMapping("/get_products")
    @Operation(description = "管理员获取商品信息")
    public BaseResponse<Page<StoreProduct>> getAdminProducts(@RequestBody GetStoreProductRequest request) {

        Page<StoreProduct> storeProductPage = new Page<>();
        storeProductPage.setRecords(List.of());
        return new BaseResponse<>(storeProductPage);
    }

}
