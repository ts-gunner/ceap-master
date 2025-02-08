package com.forty.ceap.controller;


import com.forty.ceap.request.AdminLoginRequest;
import com.forty.ceap.response.BaseResponse;
import com.forty.ceap.service.AdminLoginService;
import com.forty.ceap.vo.SystemAdminVo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("auth")
@Tag(name="AdminLoginController", description = "管理端用户登录服务")
@RestController
public class AdminLoginController {

    @Autowired
    private AdminLoginService adminLoginService;

    @Operation(description="PC端登录")
    @PostMapping("/signin")
    public BaseResponse<String> adminLogin(@RequestBody @Validated AdminLoginRequest loginRequest, HttpServletRequest httpRequest) {
        String ip = httpRequest.getHeader("Access-Ip-Address");
        String token = adminLoginService.login(loginRequest, ip);
        return new BaseResponse<>(token);
    }

    @PreAuthorize("hasAuthority('admin:logout')")
    @Operation(description = "PC端退出登录")
    @GetMapping("/signout")
    public BaseResponse<Object> adminLogout() {
        adminLoginService.logout();
        return new BaseResponse<>();
    }


    @PreAuthorize("hasAuthority('admin:info')")
    @Operation(description = "获取用户详情")
    @GetMapping("/get_admin_info")
    public BaseResponse<SystemAdminVo> getAdminInfo() {
        return new BaseResponse<>(adminLoginService.getSystemAdminVo());
    }

    @GetMapping("/get_menus")
    public BaseResponse<Object> getMenuList() {
        return new BaseResponse<>();
    }
}
