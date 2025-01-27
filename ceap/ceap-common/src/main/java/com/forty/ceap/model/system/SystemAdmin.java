package com.forty.ceap.model.system;


import com.baomidou.mybatisplus.annotation.*;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Data
@TableName("cp_system_admin")
@ApiModel(value="后台管理员对象", description="后台管理员表")
public class SystemAdmin implements Serializable {


    @ApiModelProperty(value = "后台管理员表ID")
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty(value = "后台管理员账号")
    private String account;

    @ApiModelProperty(value = "后台管理员密码")
    private String pwd;

    @TableField("real_name")
    @ApiModelProperty(value = "后台管理员姓名")
    private String realName;

    @ApiModelProperty(value = "后台管理员权限(menus_id)")
    private String roles;

    @TableField("last_ip")
    @ApiModelProperty(value = "后台管理员最后一次登录ip")
    private String lastIp;

    @TableField("update_time")
    @ApiModelProperty(value = "后台管理员最后一次登录时间")
    private Date updateTime;

    @TableField("create_time")
    @ApiModelProperty(value = "后台管理员添加时间")
    private Date createTime;

    @ApiModelProperty(value = "后台管理员级别")
    private Integer level;

    @ApiModelProperty(value = "后台管理员状态 1有效0无效")
    private Boolean status;


    @TableLogic
    @TableField("is_delete")
    @ApiModelProperty(value = "是否删除 1是0否")
    private Boolean isDelete;

    @TableField("login_count")
    @ApiModelProperty(value = "登录次数")
    private Integer loginCount;

    @ApiModelProperty(value = "手机号码")
    private String phone;

    @TableField("is_sms")
    @ApiModelProperty(value = "是否接收短信")
    private Boolean isSms;


    @Serial
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
