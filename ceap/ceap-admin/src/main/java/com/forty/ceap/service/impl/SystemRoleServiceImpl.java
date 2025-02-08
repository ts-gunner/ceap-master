package com.forty.ceap.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.forty.ceap.constants.RedisConstant;
import com.forty.ceap.enums.ErrorCode;
import com.forty.ceap.exception.BusinessException;
import com.forty.ceap.mapper.SystemRoleMapper;
import com.forty.ceap.mapper.SystemRolePermissionMapper;
import com.forty.ceap.model.system.SystemPermission;
import com.forty.ceap.model.system.SystemRole;
import com.forty.ceap.model.system.SystemRolePermission;
import com.forty.ceap.request.RoleAddPermissionRequest;
import com.forty.ceap.service.SystemRoleService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class SystemRoleServiceImpl extends ServiceImpl<SystemRoleMapper, SystemRole>
        implements SystemRoleService {

    @Autowired
    SystemRolePermissionMapper systemRolePermissionMapper;

    @Resource
    RedisTemplate<String,Object> redisTemplate;

    /**
     * 根据roles字符串获取role列表
     * 加入roles为空，则查询所有角色
     * @param roles： ex: "1,2"
     * @return
     */
    public List<SystemRole> getRoleListByRoles(String roles){
        if (StrUtil.isEmpty(roles)){
            Object obj = redisTemplate.opsForValue().get(RedisConstant.SYSTEM_ROLE);
            if (obj != null){
                return (List<SystemRole>) obj;
            }else {
                QueryWrapper<SystemRole> queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("status",true);
                List<SystemRole> systemRoles = this.baseMapper.selectList(queryWrapper);
                redisTemplate.opsForValue().set(RedisConstant.SYSTEM_ROLE, systemRoles, Duration.ofHours(5));
                return systemRoles;
            }
        }else {
            String[] roleIds = roles.split(",");
            return this.baseMapper.selectByIds(Arrays.stream(roleIds).toList());
        }
    }

    @Override
    @Transactional(rollbackFor = BusinessException.class)
    public void roleAddPermission(RoleAddPermissionRequest request) {
        if (request.getRoleId() == null){
            throw new BusinessException(ErrorCode.PARAM_ERROR, "缺少参数");
        }
        // 查询该角色是否已有若干权限
        QueryWrapper<SystemRolePermission> queryWrapper = new QueryWrapper<>();
        List<Integer> perms = Arrays.stream(request.getPermissionId().split(",")).map(Integer::parseInt).toList();
        queryWrapper.eq("rid", request.getRoleId());
        List<SystemRolePermission> rolePermissions = systemRolePermissionMapper.selectList(queryWrapper);
        List<Integer> dbPerms = rolePermissions.stream().map(SystemRolePermission::getPid).toList();
        List<Integer> savePermIds = perms.stream().filter(it -> !dbPerms.contains(it)).toList();
        List<Integer> deletePermIds = dbPerms.stream().filter(it -> !perms.contains(it)).toList();
        if (savePermIds.isEmpty() && deletePermIds.isEmpty()){
            throw new BusinessException(ErrorCode.FAIL, "无需操作");
        }

        // 删除权限
        if (!deletePermIds.isEmpty()){
            QueryWrapper<SystemRolePermission> deleteQueryWrapper = new QueryWrapper<>();
            deleteQueryWrapper.eq("rid", request.getRoleId());
            deleteQueryWrapper.in("pid", deletePermIds);
            systemRolePermissionMapper.delete(deleteQueryWrapper);

        }

        // 添加权限
        if (!savePermIds.isEmpty()){
            List<SystemRolePermission> saveRolePermissionList = new ArrayList<>();
            for (Integer permId : savePermIds) {
                SystemRolePermission rolePermission = new SystemRolePermission();
                rolePermission.setPid(permId);
                rolePermission.setRid(request.getRoleId());
                saveRolePermissionList.add(rolePermission);
            }
            systemRolePermissionMapper.insert(saveRolePermissionList);
        }

    }



}
