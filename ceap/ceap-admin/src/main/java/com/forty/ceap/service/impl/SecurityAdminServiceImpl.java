package com.forty.ceap.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.forty.ceap.enums.ErrorCode;
import com.forty.ceap.exception.BusinessException;
import com.forty.ceap.mapper.SystemAdminMapper;
import com.forty.ceap.model.system.SystemAdmin;
import com.forty.ceap.model.system.SystemPermission;
import com.forty.ceap.service.SystemPermissionService;
import com.forty.ceap.vo.LoginAdminVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

/**
 * 用户登录的时候会调用UserDetailsService， spring security的用户服务层
 */
@Service
public class SecurityAdminServiceImpl implements UserDetailsService {
    @Autowired
    SystemAdminMapper systemAdminMapper;

    @Autowired
    SystemPermissionService systemPermissionService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        QueryWrapper<SystemAdmin> wrapper = new QueryWrapper<>();
        wrapper.eq("account", username);
        SystemAdmin systemAdmin = systemAdminMapper.selectOne(wrapper);
        if (systemAdmin == null) {
            throw new BusinessException(ErrorCode.DATA_NOT_EXIST, "用户不存在");
        }
        if (!systemAdmin.getStatus()){
            throw new BusinessException(ErrorCode.FAIL, StrUtil.format("您的账号{}已停用", systemAdmin.getAccount()));
        }
        return createLoginUser(systemAdmin);
    }

    public UserDetails createLoginUser(SystemAdmin systemAdmin) {
        List<Integer> roles = Stream.of(systemAdmin.getRoles().split(",")).map(Integer::valueOf).toList();
        List<SystemPermission> systemPermissions = systemPermissionService.batchGetPermissionsByRoleIds(roles);
        return new LoginAdminVo(systemAdmin, systemPermissions);
    }
}
