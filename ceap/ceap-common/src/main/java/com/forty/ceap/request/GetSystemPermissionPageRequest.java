package com.forty.ceap.request;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;


@EqualsAndHashCode(callSuper = true)
@Data
public class GetSystemPermissionPageRequest extends PageRequest implements Serializable {

    String permissionName;

    String permissionCode;
}
