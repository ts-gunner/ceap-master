package com.forty.ceap.security;

import cn.hutool.json.JSONUtil;
import com.forty.ceap.enums.ErrorCode;
import com.forty.ceap.response.BaseResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;


/**
 * 认证失败，返回未授权
 */
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setStatus(200);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        try {
            response.getWriter().println(JSONUtil.toJsonStr(new BaseResponse<>(ErrorCode.AUTH_FAIL.getCode(), "身份验证失败！")));
        }catch (Exception e) {
            e.printStackTrace();
        }
    }
}
