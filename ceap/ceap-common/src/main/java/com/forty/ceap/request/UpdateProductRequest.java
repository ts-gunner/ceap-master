package com.forty.ceap.request;


import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.io.Serializable;

@Data
@ApiModel(description = "更新商品信息")
public class UpdateProductRequest implements Serializable {

    private Integer productId;

    private String productName;

    private String description;

    private static final long serialVersionUID = 1L;
}
