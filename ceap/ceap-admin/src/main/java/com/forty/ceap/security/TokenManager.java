package com.forty.ceap.security;

import cn.hutool.core.util.StrUtil;
import com.forty.ceap.constants.GlobalConstant;
import com.forty.ceap.constants.RedisConstant;
import com.forty.ceap.vo.LoginAdminVo;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.UUID;

@Component
public class TokenManager {

    @Resource
    private RedisTemplate<String, Object> redisTemplate;

    // 令牌有效期（默认30分钟） todo 调试期改为1小时
    private static final int expireTime = 60;

    private static final Long MILLIS_MINUTE = 60 * 1000L;

    private static final Long MILLIS_MINUTE_TEN = 20 * 60 * 1000L;
    /**
     * 获取登录用户对象
     */
    public LoginAdminVo getLoginAdminVo(HttpServletRequest request) {
        String token = getToken(request);
        if (StringUtils.isNotEmpty(token)){
            Object obj = redisTemplate.opsForValue().get(RedisConstant.ADMIN_TOKEN + token);
            if (ObjectUtils.isNotEmpty(obj)){
                return (LoginAdminVo)obj;
            }
            return null;
        }
        return null;
    }

    /**
     * 删除用户信息的缓存，即Token登录令牌
     */
    public void delLoginUser(String token) {
        if (StrUtil.isNotEmpty(token)){
            redisTemplate.delete(RedisConstant.ADMIN_TOKEN + token);
        }
    }

    /**
     * 获取令牌
     */
    public String getToken(HttpServletRequest request){
        return request.getHeader(GlobalConstant.TOKEN_HEADER);
    }
    /**
     * 创建令牌
     */
    public String createToken(LoginAdminVo user) {
        String token = UUID.randomUUID().toString().replace("-", "");
        user.setToken(token);
        refreshToken(user);
        return token;
    }

    /**
     * 校验令牌, 不足20分钟刷新token
     */
    public void verifyToken(LoginAdminVo user) {
        long expireTime = user.getExpireTime();
        long currentTime = System.currentTimeMillis();
        if (expireTime - currentTime <= MILLIS_MINUTE_TEN)
        {
            refreshToken(user);
        }
    }

    /**
     * 刷新令牌
     */
    public void refreshToken(LoginAdminVo user) {
        user.setLoginTime(System.currentTimeMillis());
        user.setExpireTime(user.getLoginTime() + expireTime * MILLIS_MINUTE);
        redisTemplate.opsForValue().set(RedisConstant.ADMIN_TOKEN + user.getToken(), user, Duration.ofMinutes(expireTime));
    }
}
