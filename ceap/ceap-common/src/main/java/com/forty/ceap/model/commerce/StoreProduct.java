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
@TableName("cp_store_product")
@ApiModel("商品表")
public class StoreProduct implements Serializable {

    @TableId(type = IdType.AUTO)
    @ApiModelProperty("商品ID")
    private Integer id;

    @TableField("mer_id")
    @ApiModelProperty("商户ID")
    private Integer merId;

    @TableField("image")
    @ApiModelProperty("商品图片")
    private String image;

    @TableField("slider_image")
    @ApiModelProperty("轮播图")
    private String sliderImage;

    @TableField("store_name")
    @ApiModelProperty("商品名称")
    private String storeName;

    @TableField("description")
    @ApiModelProperty("商品简介")
    private String description;

    @TableField("keyword")
    @ApiModelProperty("关键字")
    private String keyword;

    @TableField("cate_id")
    @ApiModelProperty("分类ID")
    private String cateId;

    @TableField("price")
    @ApiModelProperty("商品价格")
    private BigDecimal price;

    @TableField("vip_price")
    @ApiModelProperty("会员价格")
    private BigDecimal vipPrice;

    @TableField("ot_price")
    @ApiModelProperty("市场价")
    private BigDecimal otPrice;

    @TableField("postage")
    @ApiModelProperty("邮费")
    private BigDecimal postage;

    @TableField("unit_name")
    @ApiModelProperty("单位名")
    private String unitName;

    @TableField("sort")
    @ApiModelProperty("排序")
    private Integer sort;

    @TableField("sales")
    @ApiModelProperty("销量")
    private Integer sales;

    @TableField("stock")
    @ApiModelProperty("库存")
    private Integer stock;

    @TableField("is_show")
    @ApiModelProperty("状态（0：未上架，1：上架）")
    private Boolean isShow;

    @TableField("is_hot")
    @ApiModelProperty("是否热卖")
    private Boolean isHot;

    @TableField("is_benefit")
    @ApiModelProperty("是否优惠")
    private Boolean isBenefit;

    @TableField("is_best")
    @ApiModelProperty("是否精品")
    private Boolean isBest;

    @TableField("is_new")
    @ApiModelProperty("是否新品")
    private Boolean isNew;

    @TableField("create_time")
    @ApiModelProperty("添加时间")
    private Date createTime;

    @TableField("update_time")
    @ApiModelProperty("更新时间")
    private Date updateTime;

    @TableField("is_postage")
    @ApiModelProperty("是否包邮")
    private Boolean isPostage;

    @TableLogic
    @TableField("is_delete")
    @ApiModelProperty("是否删除")
    private Boolean isDelete;

    @TableField("browse")
    @ApiModelProperty("浏览量")
    private Integer browse;

    @TableField("temp_id")
    @ApiModelProperty("运费模板ID")
    private Integer tempId;

    @TableField("spec_type")
    @ApiModelProperty("规格 0单 1多")
    private Boolean specType;

    @TableField("flat_pattern")
    @ApiModelProperty("展示图")
    private String flatPattern;

    @Serial
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}