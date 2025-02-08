package com.forty.ceap.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.forty.ceap.request.AddSystemAdminRequest;
import com.forty.ceap.request.GetSystemAdminListRequest;
import com.forty.ceap.request.ResetAdminPasswordRequest;
import com.forty.ceap.request.UpdateAdminInfoRequest;
import com.forty.ceap.vo.SystemAdminPageVo;

public interface SystemAdminService {

    Page<SystemAdminPageVo> getSystemAdminPage(GetSystemAdminListRequest adminRequest);


    void resetAdminPassword(ResetAdminPasswordRequest adminPasswordRequest);

    void addAdminAccount(AddSystemAdminRequest request);

    void updateAdminInfo(UpdateAdminInfoRequest request);
}
