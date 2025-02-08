package com.forty.ceap.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import java.io.Serializable;

@Data
@ApiModel(value = "添加管理员请求")
public class AddSystemAdminRequest implements Serializable {

    @NotBlank(message = "账号不能为空")
    @Length(min=4, max= 12, message = "账号必须在4-12位")
    private String account;

    @NotBlank(message = "密码不能为空")
    private String password;

    @NotBlank(message = "昵称不能为空")
    private String realName;

    private String roles;
}
