package com.forty.ceap.service;

import com.forty.ceap.model.system.SystemAdmin;
import com.forty.ceap.request.AdminLoginRequest;
import com.forty.ceap.vo.SystemAdminVo;

public interface AdminLoginService {

    String login(AdminLoginRequest loginRequest, String ip);

    void logout();

    SystemAdminVo getSystemAdminVo();
}
