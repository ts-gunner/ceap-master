package com.forty.ceap.filters;


import com.forty.ceap.utils.IpUtils;
import lombok.extern.slf4j.Slf4j;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;


/**
 * 统一鉴权
 * 鉴权逻辑：
 * 用户登录，将token和userId设置到redis中，格式： SET token:token_value user_id EX expire_time
 *
 * 用户登出： 需要从redis中删除对应的token DEL token:token_value
 * 校验逻辑
 * 1. 用户查看接口，当用户发起请求时，客户端需要在请求头中附带token
 * 2. 网关提取token
 * 3. 查询redis， 看这个token是否在redis中存在
 *   1. 如果返回的user_id存在，且与token解密后的user_id一致。
 *   2. 校验token是否过期或者被篡改
 *
 *
 */
@Slf4j
@Component
public class AuthFilter implements GlobalFilter, Ordered {


    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest httpRequest = exchange.getRequest();
        String path = httpRequest.getPath().pathWithinApplication().value();
        String ipAddress = IpUtils.getIpAddress(httpRequest);

        ServerHttpRequest request = exchange.getRequest().mutate()
                .header("Access-Ip-Address", ipAddress)
                .build();


        return chain.filter(exchange.mutate().request(request).build());
    }

    @Override
    public int getOrder() {
        return 0;
    }
}
