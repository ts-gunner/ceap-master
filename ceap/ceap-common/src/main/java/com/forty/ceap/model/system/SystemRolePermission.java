package com.forty.ceap.model.system;


import com.baomidou.mybatisplus.annotation.*;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
@TableName("cp_system_role_permission")
@ApiModel("后台角色权限映射表")
public class SystemRolePermission implements Serializable {

    @ApiModelProperty("角色id")
    private Integer rid;

    @ApiModelProperty("权限id")
    private String pid;

    @TableLogic
    @TableField("is_delete")
    @ApiModelProperty(value = "是否删除 1是0否")
    private Boolean isDelete;

    @Serial
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}