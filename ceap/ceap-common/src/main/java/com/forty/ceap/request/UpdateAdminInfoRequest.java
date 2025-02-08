package com.forty.ceap.request;


import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.io.Serializable;

@Data
@ApiModel("更新管理员信息请求")
public class UpdateAdminInfoRequest implements Serializable {

    private Integer userId;

    private String realName;

    private String email;

    private String phone;

    private String roles;

    private Boolean isSms;

    private Boolean status;

}
