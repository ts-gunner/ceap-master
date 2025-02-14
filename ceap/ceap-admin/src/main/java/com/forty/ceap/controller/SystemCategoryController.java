package com.forty.ceap.controller;


import com.forty.ceap.model.common.SystemCategory;
import com.forty.ceap.request.AddCategoryRequest;
import com.forty.ceap.response.BaseResponse;
import com.forty.ceap.service.SystemCategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/category")
@Tag(name="SystemCategoryController", description = "管理端类别服务")
public class SystemCategoryController {

    @Autowired
    SystemCategoryService systemCategoryService;

    @PreAuthorize("hasAuthority('admin:category:search')")
    @GetMapping("/search")
    @Operation(description = "查询类别")
    public BaseResponse<List<SystemCategory>> getCategoryList(
            @RequestParam("categoryType") Integer categoryType,
            @RequestParam("categoryName") String categoryName
    ) {
        return new BaseResponse<>(systemCategoryService.getSystemCategorys(categoryType,categoryName));
    }


    @PreAuthorize("hasAuthority('admin:category:add')")
    @PostMapping("/add")
    @Operation(description = "添加类别")
    public BaseResponse<Object> addCategory(@RequestBody AddCategoryRequest request) {
        SystemCategory systemCategory = new SystemCategory();
        systemCategory.setName(request.getCategoryName());
        systemCategory.setType(request.getCategoryType());
        systemCategoryService.save(systemCategory);
        return new BaseResponse<>();
    }
}
