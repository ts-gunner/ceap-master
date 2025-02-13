package com.forty.ceap.model.common;


import com.baomidou.mybatisplus.annotation.*;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Data
@TableName("cp_category")
@ApiModel("分类管理表")
public class SystemCategory implements Serializable {

    @TableId(type = IdType.AUTO)
    @ApiModelProperty("分类ID")
    private Integer id;

    @TableField("pid")
    @ApiModelProperty("父级ID")
    private Integer pid;

    @TableField("name")
    @ApiModelProperty("分类名称")
    private String name;

    @TableField("type")
    @ApiModelProperty("类型")
    private Integer type;

    @TableField("create_time")
    @ApiModelProperty("创建时间")
    private Date createTime;

    @TableField("update_time")
    @ApiModelProperty("更新时间")
    private Date updateTime;

    @Serial
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}