package com.forty.ceap.security;

import com.forty.ceap.enums.ErrorCode;
import com.forty.ceap.exception.BusinessException;
import com.forty.ceap.vo.LoginAdminVo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityManager {

    /**
     * 从security上下文中获取登录用户信息
     */
    public static LoginAdminVo getLoginAdminVo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoginAdminVo user = (LoginAdminVo) authentication.getPrincipal();
        if (user == null) {
            throw new BusinessException(ErrorCode.AUTH_FAIL, "登录信息已过期，请重新登录");
        }
        return user;
    }
}
