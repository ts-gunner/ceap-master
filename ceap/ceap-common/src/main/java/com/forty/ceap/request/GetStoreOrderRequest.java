package com.forty.ceap.request;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(description = "管理端获取订单信息请求")
public class GetStoreOrderRequest extends PageRequest implements Serializable {


}
