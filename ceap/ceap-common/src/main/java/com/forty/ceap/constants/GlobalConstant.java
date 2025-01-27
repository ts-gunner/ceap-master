package com.forty.ceap.constants;

public class GlobalConstant {


    public static final String LOCALHOST_IP = "127.0.0.1";

    public static final String LOCALHOST_IP_v6 = "0:0:0:0:0:0:0:1";

    public static final String CONFIG_PREFIX = "ceap";
    /**
     * 升序
     */
    public static final String SORT_ORDER_ASC = "ascend";
    /**
     * 降序
     */
    public static final String SORT_ORDER_DESC = "descend";

    /**
     * 网关不处理的链接
     */
    public static final String[] DEFAULT_EXCLUDE_PATTERNS = new String[]{
            // backend open-api document
            "/**/swagger-resources/**", "/**/webjars/**",
            "/**/v3/**", "/**/swagger-ui.html/**",
            "/**/api", "/**/api-docs", "/**/api-docs/**",
            "/**/doc.html/**", "/**/favicon.ico"
    };

    /**
     * 不需要token校验的路由
     */
    public static final String[] TOKEN_AUTH_EXCLUDE_PATTERNS = new String[]{
            "/**/user_login",  "/**/user_logout"
    };

    /**
     * 请求头 - token字段
     */
    public static final String TOKEN_HEADER = "Authorization";
}
