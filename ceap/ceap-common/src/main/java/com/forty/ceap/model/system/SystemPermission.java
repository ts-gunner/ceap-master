package com.forty.ceap.model.system;

import com.baomidou.mybatisplus.annotation.*;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
@TableName("cp_system_permission")
@ApiModel("后台权限表")
public class SystemPermission implements Serializable {

    @TableId(type = IdType.AUTO)
    @ApiModelProperty("角色id")
    private Integer id;

    @ApiModelProperty("角色父级id")
    private Integer pid;

    @ApiModelProperty("角色名称")
    private String name;

    @ApiModelProperty("角色代号")
    private String code;

    @TableLogic
    @TableField("is_delete")
    @ApiModelProperty(value = "是否删除 1是0否")
    private Boolean isDelete;

    @Serial
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
