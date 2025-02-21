package com.forty.ceap.enums;


public enum StoreProductTypeEnum {

    ON_SALE(0, "出售中商品", "已上架、未回收、有库存的商品"),
    ON_STORE(1, "仓库商品", "未上架、未回收、有库存的商品"),
    SELL_OUT(2, "售罄商品", "未回收、无库存的商品"),
    RECYCLE(3, "已回收商品", "已回收的商品");

    private final Integer productType;

    private final String typeName;

    private final String description;

    private StoreProductTypeEnum(Integer productType, String typeName, String description) {
        this.productType = productType;
        this.typeName = typeName;
        this.description = description;
    }

    public String getTypeName() {
        return typeName;
    }

    public Integer getProductType() {
        return productType;
    }

    public String getDescription() {
        return description;
    }
}
