package com.forty.ceap.service;

import com.forty.ceap.model.system.SystemPermission;

import java.util.List;

public interface SystemPermissionService {

    List<SystemPermission> batchGetPermissionsByRoleIds(List<Integer> roleIds);
}
