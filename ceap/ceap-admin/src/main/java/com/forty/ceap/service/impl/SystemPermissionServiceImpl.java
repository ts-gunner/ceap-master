package com.forty.ceap.service.impl;

import com.forty.ceap.mapper.SystemRolePermissionMapper;
import com.forty.ceap.model.system.SystemPermission;
import com.forty.ceap.service.SystemPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class SystemPermissionServiceImpl implements SystemPermissionService {

    @Autowired
    SystemRolePermissionMapper systemRolePermissionMapper;

    @Override
    public List<SystemPermission> batchGetPermissionsByRoleIds(List<Integer> roleIds) {
        return systemRolePermissionMapper.getPermissionsByRoleIds(roleIds);
    }
}
