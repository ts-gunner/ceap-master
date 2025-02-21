package com.forty.ceap.vo;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class StoreProductVo implements Serializable {

    private Integer id;

    private String image;

    private String storeName;

    private BigDecimal price;

    private BigDecimal otPrice;

    private Integer sales;

    private Integer stock;

    private Date createTime;

    private Boolean isShow;

    private Boolean isRecycle;

}
