package com.forty.ceap.request;


import lombok.Data;

import java.io.Serializable;

@Data
public class UpdateSystemRoleRequest implements Serializable {

    Integer roleId;

    String roleName;
}
