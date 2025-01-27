package com.forty.ceap.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.forty.ceap.model.system.SystemAdmin;
import com.forty.ceap.model.system.SystemPermission;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
public class LoginAdminVo implements UserDetails {
    @Serial
    private static final long serialVersionUID = 1L;

    private String token;

    /**
     * 登录时间
     */
    private Long loginTime;

    /**
     * 过期时间
     */
    private Long expireTime;

    /**
     * 登录ip
     */
    private String ipAddr;

    /**
     * 登录地点
     */
    private String loginLocation;

    /**
     * 浏览器类型
     */
    private String browser;

    /**
     * 操作系统
     */
    private String os;

    /**
     * 权限列表
     */
    private List<SystemPermission> permissions;

    /**
     * 用户登录信息
     */
    private SystemAdmin systemAdmin;

    public LoginAdminVo(SystemAdmin systemAdmin, List<SystemPermission> permissions) {
        this.systemAdmin = systemAdmin;
        this.permissions = permissions;
    }

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>(permissions.size());
        for (SystemPermission permission : permissions) {
            authorities.add(new SimpleGrantedAuthority(permission.getCode()));
        }
        return authorities;
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return this.systemAdmin.getPwd();
    }

    @Override
    public String getUsername() {
        return this.systemAdmin.getAccount();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
