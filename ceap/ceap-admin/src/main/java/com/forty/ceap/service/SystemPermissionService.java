package com.forty.ceap.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.forty.ceap.model.system.SystemPermission;
import com.forty.ceap.request.GetSystemPermissionPageRequest;

import java.util.List;

public interface SystemPermissionService extends IService<SystemPermission> {

    List<SystemPermission> batchGetPermissionsByRoleIds(List<Integer> roleIds);

    Page<SystemPermission> getPermissionList(GetSystemPermissionPageRequest request);
}
