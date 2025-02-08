package com.forty.ceap.request;


import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(description = "查询角色页的请求")
public class GetRolesPageRequest extends PageRequest  implements Serializable {

    private String roleName;

    private Boolean status;
}
