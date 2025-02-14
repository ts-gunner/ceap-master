package com.forty.ceap.model.common;


import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@TableName("cp_attachment_category")
@ApiModel("附件类型映射表")
public class AttachmentCategory {

    @TableField("aid")
    @ApiModelProperty("附件id")
    private Integer aid;

    @TableField("cid")
    @ApiModelProperty("类型id")
    private Integer cid;
}
