package com.forty.ceap.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.forty.ceap.model.commerce.StoreOrder;
import com.forty.ceap.request.GetStoreOrderRequest;
import com.forty.ceap.response.BaseResponse;
import com.forty.ceap.service.StoreOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/orders")
@Tag(name="StoreOrderController", description = "管理端订单服务")
public class StoreOrderController {

    @Autowired
    private StoreOrderService storeOrderService;

    @PreAuthorize("hasAuthority('admin:orders:get')")
    @PostMapping("/get_orders")
    @Operation(description = "管理员获取订单信息")
    public BaseResponse<Page<StoreOrder>> getAdminOrders(@RequestBody GetStoreOrderRequest request) {
        Page<StoreOrder> storeOrderPage = new Page<>(request.getCurrentPage(), request.getPageSize());
        QueryWrapper<StoreOrder> queryWrapper = new QueryWrapper<>();

        Page<StoreOrder> orderPage = storeOrderService.getBaseMapper().selectPage(storeOrderPage, queryWrapper);

        return new BaseResponse<>(orderPage);
    }

}
