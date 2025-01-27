package com.forty.ceap.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.forty.ceap.model.system.SystemPermission;
import com.forty.ceap.model.system.SystemRolePermission;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface SystemRolePermissionMapper extends BaseMapper<SystemRolePermission> {

    List<SystemPermission> getPermissionsByRoleIds(@Param("roleIds") List<Integer> roleIds);
}
