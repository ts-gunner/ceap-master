package com.forty.ceap.request;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@ApiModel(description = "添加商品请求")
public class AddProductRequest implements Serializable {

    @ApiModelProperty(name = "产品图")
    String productImage;

    @ApiModelProperty(name="产品名称")
    String storeName;

    @ApiModelProperty(name = "产品简介")
    String description;

    @ApiModelProperty(name= "关键词")
    String keyword;

    @ApiModelProperty(name = "商品价格")
    BigDecimal price;

    @ApiModelProperty(name = "市场价")
    BigDecimal otPrice;

    @ApiModelProperty(name = "商品单位名称")
    String unitName;

    @ApiModelProperty(name = "库存")
    Integer stock;

    @ApiModelProperty(name = "是否上架")
    Boolean isShow;

    @ApiModelProperty(name = "是否包邮")
    Boolean isPostage;


}
