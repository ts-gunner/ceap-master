package com.forty.ceap.model.common;


import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Data
@TableName("cp_system_attachment")
@ApiModel("附件管理表")
public class SystemAttachment implements Serializable {

    @TableId
    @ApiModelProperty("附件ID")
    private String id;

    @TableField("att_name")
    @ApiModelProperty("附件名称")
    private String attName;

    @TableField("att_dir")
    @ApiModelProperty("附件路径")
    private String attDir;

    @TableField("satt_dir")
    @ApiModelProperty("压缩图片路径")
    private String sattDir;

    @TableField("att_size")
    @ApiModelProperty("附件大小")
    private String attSize;

    @TableField("att_type")
    @ApiModelProperty("附件类型")
    private String attType;

    @TableField("category_id")
    @ApiModelProperty("分类ID")
    private Integer categoryId;

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