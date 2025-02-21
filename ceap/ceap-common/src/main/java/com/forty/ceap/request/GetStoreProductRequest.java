package com.forty.ceap.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(description = "获取商品信息请求")
public class GetStoreProductRequest extends PageRequest implements Serializable {

    /**
     * 商品所在列表，
     * 0：出售中商品， 已上架且未回收且库存还有的商品
     * 1：仓库商品， 未上架且未回收且库存还有的商品
     * 2：售罄商品  库存无且未回收的商品
     * 3：商品回收站  已回收的商品
     */
    private Integer productType;


}
