package com.forty.ceap.vo;


import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@ApiModel(description = "管理端管理员列表模型")
public class SystemAdminPageVo implements Serializable {

    private Integer id;

    private String account;

    private String realName;

    private String lastIp;

    private String roleNames;

    private String roles;

    private Integer loginCount;

    private Boolean status;

    private String phone;

    private String email;

    private Boolean isSms;

    private Date createTime;

    private Date updateTime;
}
