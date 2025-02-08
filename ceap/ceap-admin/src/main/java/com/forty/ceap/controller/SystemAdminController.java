package com.forty.ceap.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.forty.ceap.request.AddSystemAdminRequest;
import com.forty.ceap.request.GetSystemAdminListRequest;
import com.forty.ceap.request.ResetAdminPasswordRequest;
import com.forty.ceap.request.UpdateAdminInfoRequest;
import com.forty.ceap.response.BaseResponse;
import com.forty.ceap.service.SystemAdminService;
import com.forty.ceap.vo.SystemAdminPageVo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/admins")
@Tag(name="SystemAdminController", description = "管理端用户服务")
public class SystemAdminController {

    @Autowired
    SystemAdminService systemAdminService;

    @PreAuthorize("hasAuthority('admin:admin:users')")
    @PostMapping("/get_admins")
    @Operation(description = "获取管理端用户列表")
    public BaseResponse<Page<SystemAdminPageVo>> getAdmins(@RequestBody GetSystemAdminListRequest request) {

        Page<SystemAdminPageVo> systemAdminPage = systemAdminService.getSystemAdminPage(request);

        return new BaseResponse<>(systemAdminPage);
    }


    @PreAuthorize("hasAuthority('admin:admin:update')")
    @PostMapping("/reset_password")
    @Operation(description = "重置管理员密码")
    public BaseResponse<Object> resetAdminPassword(@RequestBody ResetAdminPasswordRequest request) {
        systemAdminService.resetAdminPassword(request);
        return new BaseResponse<>();
    }

    @PreAuthorize("hasAuthority('admin:admin:add')")
    @PostMapping("/add_admin_user")
    @Operation(description = "添加管理员账号")
    public BaseResponse<Object> addAdminAccount(@RequestBody @Validated AddSystemAdminRequest request){
        systemAdminService.addAdminAccount(request);
        return new BaseResponse<>();
    }


    @PreAuthorize("hasAuthority('admin:admin:update')")
    @PostMapping("/update_admin_info")
    @Operation(description = "更新管理员信息")
    public BaseResponse<Object> updateAdminInfo(@RequestBody UpdateAdminInfoRequest request){
        systemAdminService.updateAdminInfo(request);
        return new BaseResponse<>();
    }
}
