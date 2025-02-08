package com.forty.ceap.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.forty.ceap.model.system.SystemPermission;
import com.forty.ceap.model.system.SystemRole;
import com.forty.ceap.model.system.SystemRolePermission;
import com.forty.ceap.request.GetSystemPermissionPageRequest;
import com.forty.ceap.response.BaseResponse;
import com.forty.ceap.service.SystemPermissionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/perms")
@Tag(name="SystemPermissionController", description = "管理端权限服务")
public class SystemPermissionController {

    @Autowired
    SystemPermissionService systemPermissionService;

    @PreAuthorize("hasAuthority('admin:perms:search')")
    @PostMapping("/rules")
    @Operation(description = "获取权限规则页")
    public BaseResponse<Page<SystemPermission>> getRules(@RequestBody GetSystemPermissionPageRequest request) {
        return new BaseResponse<>(systemPermissionService.getPermissionList(request));
    }

    @PreAuthorize("hasAuthority('admin:perms:search')")
    @GetMapping("/get_permissions")
    @Operation(description = "获取权限")
    public BaseResponse<List<SystemPermission>> getPermissions(@RequestParam("roleId") Integer roleId) {
        List<SystemPermission> systemPermissions;
        if (roleId != null && roleId >= 0) {
            systemPermissions = systemPermissionService.batchGetPermissionsByRoleIds(Collections.singletonList(roleId));
        }else {
            systemPermissions = systemPermissionService.getBaseMapper().selectList(null);

        }
        return new BaseResponse<>(systemPermissions);
    }

}
