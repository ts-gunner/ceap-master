package com.forty.ceap.model.commerce;

import com.baomidou.mybatisplus.annotation.*;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
@TableName("cp_order_product_info")
@ApiModel("订单与商品的信息表")
public class OrderProduct implements Serializable {

    @TableId(type = IdType.AUTO)
    @ApiModelProperty("主键")
    private Integer id;

    @TableField("order_id")
    @ApiModelProperty("订单ID")
    private Integer orderId;

    @TableField("product_id")
    @ApiModelProperty("商品ID")
    private Integer productId;

    @TableField("info")
    @ApiModelProperty("购买东西的详细信息")
    private String info;

    @TableField("order_num")
    @ApiModelProperty("订单号")
    private String orderNum;

    @TableField("create_time")
    @ApiModelProperty("创建时间")
    private Date createTime;

    @TableField("update_time")
    @ApiModelProperty("更新时间")
    private Date updateTime;

    @TableField("product_name")
    @ApiModelProperty("商品名称")
    private String productName;

    @TableField("attr_value_id")
    @ApiModelProperty("规格属性值ID")
    private Integer attrValueId;

    @TableField("image")
    @ApiModelProperty("商品图片")
    private String image;

    @TableField("sku")
    @ApiModelProperty("商品SKU")
    private String sku;

    @TableField("price")
    @ApiModelProperty("商品价格")
    private BigDecimal price;

    @TableField("pay_num")
    @ApiModelProperty("购买数量")
    private Integer payNum;

    @TableField("weight")
    @ApiModelProperty("重量")
    private BigDecimal weight;

    @TableField("volume")
    @ApiModelProperty("体积")
    private BigDecimal volume;

    @TableField("is_reply")
    @ApiModelProperty("是否评价")
    private Boolean isReply;

    @TableField("vip_price")
    @ApiModelProperty("会员价")
    private BigDecimal vipPrice;

    @TableField("product_type")
    @ApiModelProperty("商品类型")
    private Integer productType;

    @Serial
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}