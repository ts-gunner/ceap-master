package com.forty.ceap.model.commerce;

import com.baomidou.mybatisplus.annotation.*;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Data
@TableName("cp_order_operation_record")
@ApiModel("订单操作记录表")
public class OrderOperationRecord implements Serializable {

    @TableId(type = IdType.AUTO)
    @ApiModelProperty("主键")
    private Integer id;

    @TableField("order_id")
    @ApiModelProperty("订单ID")
    private Integer orderId;

    @TableField("change_type")
    @ApiModelProperty("操作类型")
    private String changeType;

    @TableField("change_message")
    @ApiModelProperty("操作备注")
    private String changeMessage;

    @TableField("create_time")
    @ApiModelProperty("操作时间")
    private Date createTime;

    @Serial
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}