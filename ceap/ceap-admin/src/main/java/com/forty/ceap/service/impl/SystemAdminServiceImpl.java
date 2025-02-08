package com.forty.ceap.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.forty.ceap.enums.ErrorCode;
import com.forty.ceap.exception.BusinessException;
import com.forty.ceap.mapper.SystemAdminMapper;
import com.forty.ceap.model.system.SystemAdmin;
import com.forty.ceap.model.system.SystemRole;
import com.forty.ceap.request.AddSystemAdminRequest;
import com.forty.ceap.request.GetSystemAdminListRequest;
import com.forty.ceap.request.ResetAdminPasswordRequest;
import com.forty.ceap.request.UpdateAdminInfoRequest;
import com.forty.ceap.service.SystemAdminService;
import com.forty.ceap.service.SystemRoleService;
import com.forty.ceap.vo.SystemAdminPageVo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class SystemAdminServiceImpl implements SystemAdminService {

    @Autowired
    SystemAdminMapper systemAdminMapper;

    @Autowired
    SystemRoleService systemRoleService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    @Transactional(rollbackFor = BusinessException.class, isolation = Isolation.READ_COMMITTED)
    public Page<SystemAdminPageVo> getSystemAdminPage(GetSystemAdminListRequest adminRequest) {
        Page<SystemAdmin> page = new Page<>(adminRequest.getCurrentPage(), adminRequest.getPageSize());
        QueryWrapper<SystemAdmin> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(adminRequest.getStatus() != null, "status", adminRequest.getStatus());
        queryWrapper.eq(StrUtil.isNotEmpty(adminRequest.getAccount()), "account", adminRequest.getAccount());
        Page<SystemAdmin> systemAdminPage = systemAdminMapper.selectPage(page, queryWrapper);
        List<SystemRole> roleList = systemRoleService.getRoleListByRoles("");
        List<SystemAdminPageVo> systemAdminPageVoList = systemAdminPage.getRecords().stream().map(it -> {
            SystemAdminPageVo vo = new SystemAdminPageVo();
            BeanUtils.copyProperties(it, vo);
            List<SystemRole> aftRoles = roleList.stream()
                    .filter(rt -> Arrays.stream(
                            it.getRoles().split(",")).map(Integer::parseInt
                    ).toList().contains(rt.getId()))
                    .toList();
            String roleName = aftRoles.stream().map(SystemRole::getRoleName).collect(Collectors.joining(","));
            vo.setRoleNames(StrUtil.isEmpty(roleName) ? "" : roleName);
            return vo;
        }).toList();
        Page<SystemAdminPageVo> systemAdminPageVoPage = new Page<>(adminRequest.getCurrentPage(), adminRequest.getPageSize());
        systemAdminPageVoPage.setTotal(systemAdminPage.getTotal());
        systemAdminPageVoPage.setRecords(systemAdminPageVoList);

        return systemAdminPageVoPage;
    }

    @Override
    @Transactional(rollbackFor = BusinessException.class, isolation = Isolation.READ_COMMITTED)
    public void resetAdminPassword(ResetAdminPasswordRequest request) {
        if (StrUtil.isEmpty(request.getPassword()) || StrUtil.isEmpty(request.getRePassword())) {
            throw new BusinessException(ErrorCode.PARAM_ERROR, "密码和二次密码不能为空");
        }

        if (!request.getPassword().equals(request.getRePassword())){
            throw new BusinessException(ErrorCode.PARAM_ERROR, "两次密码不一致");
        }

        synchronized (this){
            UpdateWrapper<SystemAdmin> updateWrapper = new UpdateWrapper<>();
            updateWrapper.eq("id", request.getUserId());
            updateWrapper.set("pwd", passwordEncoder.encode(request.getPassword()));
            systemAdminMapper.update(updateWrapper);
        }
    }

    @Override
    @Transactional(rollbackFor = BusinessException.class, isolation = Isolation.READ_COMMITTED)
    public void addAdminAccount(AddSystemAdminRequest request) {
        QueryWrapper<SystemAdmin> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("account", request.getAccount());
        SystemAdmin systemAdminObject = systemAdminMapper.selectOne(queryWrapper);
        if (systemAdminObject != null) {
            throw new BusinessException(ErrorCode.PARAM_ERROR, "该账号已存在，添加失败");
        }

        synchronized (this){
            SystemAdmin systemAdmin = new SystemAdmin();
            systemAdmin.setAccount(request.getAccount());
            systemAdmin.setPwd(passwordEncoder.encode(request.getPassword()));
            systemAdmin.setRealName(request.getRealName());
            systemAdmin.setRoles(StrUtil.isEmpty(request.getRoles()) ? "" : request.getRoles());
            systemAdminMapper.insert(systemAdmin);
        }
    }

    @Override
    @Transactional(rollbackFor = BusinessException.class, isolation = Isolation.READ_COMMITTED)
    public void updateAdminInfo(UpdateAdminInfoRequest request) {
        UpdateWrapper<SystemAdmin> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("id", request.getUserId());
        updateWrapper.set(StrUtil.isNotEmpty(request.getEmail()), "email", request.getEmail());
        updateWrapper.set(StrUtil.isNotEmpty(request.getPhone()),  "phone", request.getPhone());
        updateWrapper.set(StrUtil.isNotEmpty(request.getRealName()), "real_name", request.getRealName());
        updateWrapper.set(request.getStatus() != null, "status", request.getStatus());
        updateWrapper.set(request.getIsSms() != null, "is_sms", request.getIsSms());
        updateWrapper.set(StrUtil.isNotEmpty(request.getRoles()),  "roles", request.getRoles());
        systemAdminMapper.update(updateWrapper);

    }
}
