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
@TableName("cp_store_order")
@ApiModel("订单表")
public class StoreOrder implements Serializable {

    @TableId(type = IdType.AUTO)
    @ApiModelProperty("订单ID")
    private Integer id;

    @TableField("order_id")
    @ApiModelProperty("订单号")
    private String orderId;

    @TableField("user_id")
    @ApiModelProperty("用户ID")
    private Integer userId;

    @TableField("real_name")
    @ApiModelProperty("用户姓名")
    private String realName;

    @TableField("user_phone")
    @ApiModelProperty("用户电话")
    private String userPhone;

    @TableField("user_address")
    @ApiModelProperty("用户地址")
    private String userAddress;

    @TableField("freight_price")
    @ApiModelProperty("运费")
    private BigDecimal freightPrice;

    @TableField("total_num")
    @ApiModelProperty("订单商品总数")
    private Integer totalNum;

    @TableField("total_price")
    @ApiModelProperty("订单总价")
    private BigDecimal totalPrice;

    @TableField("total_postage")
    @ApiModelProperty("邮费")
    private BigDecimal totalPostage;

    @TableField("pay_price")
    @ApiModelProperty("实际支付金额")
    private BigDecimal payPrice;

    @TableField("pay_postage")
    @ApiModelProperty("实际支付邮费")
    private BigDecimal payPostage;

    @TableField("deduction_price")
    @ApiModelProperty("抵扣金额")
    private BigDecimal deductionPrice;

    @TableField("coupon_id")
    @ApiModelProperty("优惠券ID")
    private Integer couponId;

    @TableField("coupon_price")
    @ApiModelProperty("优惠券金额")
    private BigDecimal couponPrice;

    @TableField("paid")
    @ApiModelProperty("支付状态")
    private Boolean paid;

    @TableField("pay_time")
    @ApiModelProperty("支付时间")
    private Date payTime;

    @TableField("pay_type")
    @ApiModelProperty("支付方式")
    private String payType;

    @TableField("create_time")
    @ApiModelProperty("创建时间")
    private Date createTime;

    @TableField("status")
    @ApiModelProperty("订单状态")
    private Integer status;

    @TableField("refund_status")
    @ApiModelProperty("退款状态")
    private Integer refundStatus;

    @TableField("refund_reason_img_path")
    @ApiModelProperty("退款图片地址")
    private String refundReasonImgPath;

    @TableField("refund_reason_explain")
    @ApiModelProperty("退款用户说明")
    private String refundReasonExplain;

    @TableField("refund_reason_wap")
    @ApiModelProperty("退款原因")
    private String refundReasonWap;

    @TableField("refund_fail_reason")
    @ApiModelProperty("退款失败的原因")
    private String refundFailReason;

    @TableField("refund_price")
    @ApiModelProperty("退款金额")
    private BigDecimal refundPrice;

    @TableField("refund_reason_time")
    @ApiModelProperty("申请退款时间")
    private Date refundReasonTime;

    @TableField("delivery_name")
    @ApiModelProperty("快递名称/送货人名称")
    private String deliveryName;

    @TableField("delivery_type")
    @ApiModelProperty("发货类型")
    private String deliveryType;

    @TableField("delivery_id")
    @ApiModelProperty("快递单号")
    private String deliveryId;

    @TableField("remark")
    @ApiModelProperty("管理员备注")
    private String remark;

    @TableLogic
    @TableField("is_delete")
    @ApiModelProperty("逻辑删除")
    private Boolean isDelete;

    @TableField("mer_id")
    @ApiModelProperty("商户ID")
    private Integer merId;

    @TableField("is_system_del")
    @ApiModelProperty("是否后台删除")
    private Boolean isSystemDel;

    @TableField("update_time")
    @ApiModelProperty("更新时间")
    private Date updateTime;

    @TableField("shipping_type")
    @ApiModelProperty("配送方式")
    private Integer shippingType;

    @TableField("order_type")
    @ApiModelProperty("订单类型")
    private Integer orderType;

    @Serial
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}