package com.forty.ceap.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.forty.ceap.model.system.SystemRole;
import com.forty.ceap.request.RoleAddPermissionRequest;

import java.util.List;

public interface SystemRoleService extends IService<SystemRole> {
    List<SystemRole> getRoleListByRoles(String roles);


    void roleAddPermission(RoleAddPermissionRequest request);
}
