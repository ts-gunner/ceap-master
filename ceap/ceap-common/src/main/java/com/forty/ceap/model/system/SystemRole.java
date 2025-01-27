package com.forty.ceap.model.system;


import com.baomidou.mybatisplus.annotation.*;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Data
@TableName("cp_system_role")
@ApiModel("后台角色表")
public class SystemRole implements Serializable {

    @TableId(type = IdType.AUTO)
    @ApiModelProperty("角色id")
    private Integer id;

    @TableField("role_name")
    @ApiModelProperty("角色名称")
    private String roleName;

    @ApiModelProperty("状态")
    private Boolean status;

    @TableLogic
    @TableField("is_delete")
    @ApiModelProperty(value = "是否删除 1是0否")
    private Boolean isDelete;

    @TableField("create_time")
    @ApiModelProperty(value = "添加时间")
    private Date createTime;

    @TableField("update_time")
    @ApiModelProperty(value = "更新时间")
    private Date updateTime;

    @Serial
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
