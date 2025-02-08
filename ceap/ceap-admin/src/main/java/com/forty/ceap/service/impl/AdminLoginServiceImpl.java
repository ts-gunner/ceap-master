package com.forty.ceap.service.impl;

import com.forty.ceap.enums.ErrorCode;
import com.forty.ceap.exception.BusinessException;
import com.forty.ceap.model.system.SystemPermission;
import com.forty.ceap.security.SecurityManager;
import com.forty.ceap.security.TokenManager;
import com.forty.ceap.mapper.SystemAdminMapper;
import com.forty.ceap.model.system.SystemAdmin;
import com.forty.ceap.request.AdminLoginRequest;
import com.forty.ceap.service.AdminLoginService;
import com.forty.ceap.vo.LoginAdminVo;
import com.forty.ceap.vo.SystemAdminVo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminLoginServiceImpl implements AdminLoginService {

    @Autowired
    SystemAdminMapper systemAdminMapper;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    TokenManager tokenManager;

    @Override
    public String login(AdminLoginRequest loginRequest, String ip) {

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        );
        Authentication authenticate;
        try {
            authenticate = authenticationManager.authenticate(authenticationToken);
        }catch (Exception e) {
            throw new BusinessException(ErrorCode.AUTH_FAIL, e.getMessage());
        }

        LoginAdminVo userDetails = (LoginAdminVo) authenticate.getPrincipal();
        SystemAdmin systemAdmin = userDetails.getSystemAdmin();
        String token = tokenManager.createToken(userDetails);
        systemAdmin.setLoginCount(systemAdmin.getLoginCount() + 1);
        systemAdmin.setLastIp(ip);
        systemAdminMapper.updateById(systemAdmin);
        return token;
    }

    @Override
    public void logout() {
        LoginAdminVo loginAdminVo = SecurityManager.getLoginAdminVo();
        tokenManager.delLoginUser(loginAdminVo.getToken());
    }

    @Override
    public SystemAdminVo getSystemAdminVo() {
        LoginAdminVo loginAdminVo = SecurityManager.getLoginAdminVo();
        SystemAdminVo systemAdminVo = new SystemAdminVo();
        BeanUtils.copyProperties(loginAdminVo.getSystemAdmin(), systemAdminVo);
        List<SystemPermission> permissions = loginAdminVo.getPermissions();
        List<String> permissionList = permissions.stream().map(SystemPermission::getCode).toList();
        systemAdminVo.setPermissionsList(permissionList);
        return systemAdminVo;
    }

}
