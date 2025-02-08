package com.forty.ceap.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

@Data
@ApiModel(description = "角色添加权限请求")
public class RoleAddPermissionRequest implements Serializable {

    private Integer roleId;

    @ApiModelProperty(name = "权限id， 逗号分隔")
    private String permissionId;
}
