package com.forty.ceap.request;


import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(value = "管理平台获取管理员列表请求")
public class GetSystemAdminListRequest extends PageRequest implements Serializable {

    private String account;

    private Boolean status;

}
