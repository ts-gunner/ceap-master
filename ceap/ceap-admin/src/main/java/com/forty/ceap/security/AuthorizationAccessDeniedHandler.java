package com.forty.ceap.security;


import cn.hutool.json.JSONUtil;
import com.forty.ceap.enums.ErrorCode;
import com.forty.ceap.response.BaseResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import java.io.IOException;

/**
 * 权限校验失败处理器,
 */
public class AuthorizationAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        response.setStatus(200);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        try {
            response.getWriter().println(JSONUtil.toJsonStr(new BaseResponse<>(ErrorCode.PERMISSION_DENIED.getCode(), "权限不足！")));
        }catch (Exception e) {
            e.printStackTrace();
        }
    }
}
