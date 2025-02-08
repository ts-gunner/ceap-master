package com.forty.ceap.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.forty.ceap.mapper.SystemPermissionMapper;
import com.forty.ceap.mapper.SystemRolePermissionMapper;
import com.forty.ceap.model.system.SystemPermission;
import com.forty.ceap.request.GetSystemPermissionPageRequest;
import com.forty.ceap.service.SystemPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class SystemPermissionServiceImpl extends ServiceImpl<SystemPermissionMapper, SystemPermission> implements SystemPermissionService {

    @Autowired
    SystemRolePermissionMapper systemRolePermissionMapper;

    @Autowired
    SystemPermissionMapper systemPermissionMapper;

    @Override
    public List<SystemPermission> batchGetPermissionsByRoleIds(List<Integer> roleIds) {
        return systemRolePermissionMapper.getPermissionsByRoleIds(roleIds);
    }

    @Override
    public Page<SystemPermission> getPermissionList(GetSystemPermissionPageRequest request) {
        Page<SystemPermission> page = new Page<>(request.getCurrentPage(), request.getPageSize());
        QueryWrapper<SystemPermission> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(StrUtil.isNotEmpty(request.getPermissionName()),"name", request.getPermissionName());
        queryWrapper.eq(StrUtil.isNotEmpty(request.getPermissionCode()),"code", request.getPermissionCode());
        return systemPermissionMapper.selectPage(page, queryWrapper);
    }
}
