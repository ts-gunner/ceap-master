package com.forty.ceap.controller;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.forty.ceap.model.system.SystemRole;
import com.forty.ceap.request.GetRolesPageRequest;
import com.forty.ceap.request.RoleAddPermissionRequest;
import com.forty.ceap.request.UpdateSystemRoleRequest;
import com.forty.ceap.response.BaseResponse;
import com.forty.ceap.service.SystemRoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/role")
@Tag(name="SystemRoleController", description = "管理端角色服务")
public class SystemRoleController {

    @Autowired
    SystemRoleService systemRoleService;

    @PreAuthorize("hasAuthority('admin:role:search')")
    @GetMapping("/search_roles")
    @Operation(description = "查询角色列表")
    public BaseResponse<List<SystemRole>> getRoleList(
            @RequestParam("roleName") String roleName, @RequestParam("status") Boolean status
    ) {
        QueryWrapper<SystemRole> systemRoleQueryWrapper = new QueryWrapper<>();
        systemRoleQueryWrapper.eq(StrUtil.isNotEmpty(roleName), "role_name", roleName);
        systemRoleQueryWrapper.eq("status", status);
        List<SystemRole> systemRoles = systemRoleService.getBaseMapper().selectList(systemRoleQueryWrapper);
        return new BaseResponse<>(systemRoles);
    }

    @PreAuthorize("hasAuthority('admin:role:search')")
    @PostMapping("/search_roles_page")
    @Operation(description = "查询角色列表页")
    public BaseResponse<Page<SystemRole>> getRoleListByPage(@RequestBody GetRolesPageRequest request) {
        Page<SystemRole> systemRolePage = new Page<>(request.getCurrentPage(), request.getPageSize());
        QueryWrapper<SystemRole> systemRoleQueryWrapper = new QueryWrapper<>();
        systemRoleQueryWrapper.eq(StrUtil.isNotEmpty(request.getRoleName()), "role_name", request.getRoleName());
        systemRoleQueryWrapper.eq(request.getRoleName() != null, "status", request.getStatus());
        return new BaseResponse<>(systemRoleService.getBaseMapper().selectPage(systemRolePage,systemRoleQueryWrapper));
    }

    @PreAuthorize("hasAuthority('admin:role:add')")
    @GetMapping("/add_role")
    @Operation(description = "添加角色")
    public BaseResponse<Object> addRole(@RequestParam("roleName") String roleName) {
        SystemRole systemRole = new SystemRole();
        systemRole.setRoleName(roleName);
        systemRoleService.save(systemRole);
        return new BaseResponse<>();
    }


    @PreAuthorize("hasAuthority('admin:role:addPerms')")
    @PostMapping("/role_add_perms")
    @Operation(description = "给角色添加权限或者取消授权")
    public BaseResponse<Object> addRolePerms(@RequestBody RoleAddPermissionRequest request){
        systemRoleService.roleAddPermission(request);
        return new BaseResponse<>();
    }

    @PreAuthorize("hasAuthority('admin:role:update')")
    @PostMapping("/update_role")
    @Operation(description = "更新角色")
    public BaseResponse<Object> updateRoleInfo(@RequestBody UpdateSystemRoleRequest request){
        UpdateWrapper<SystemRole> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("id", request.getRoleId());
        updateWrapper.set("role_name", request.getRoleName());
        systemRoleService.getBaseMapper().update(updateWrapper);
        return new BaseResponse<>();
    }


}
