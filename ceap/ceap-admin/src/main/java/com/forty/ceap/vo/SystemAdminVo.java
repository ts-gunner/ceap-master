package com.forty.ceap.vo;

import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@ApiModel(description = "管理端用户的信息")
public class SystemAdminVo implements Serializable {

    private Integer id;

    private String account;

    private String realName;

    private String roles;

    private String roleNames;

    private String lastIp;

    private Integer loginCount;

    private Integer level;

    private Boolean status;

    private String token;

    private String phone;

    private Boolean isSms;

    private List<String> permissionsList;

    private static final long serialVersionUID = 1L;
}
