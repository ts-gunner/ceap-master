package com.forty.ceap.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import java.io.Serializable;


@Data
@ApiModel(value = "管理平台登录请求")
public class AdminLoginRequest implements Serializable {


    @NotBlank(message = "账号不能为空")
    @Length(min=4, max= 12, message = "账号必须在4-12位")
    @ApiModelProperty("管理员账号")
    private String username;

    @NotBlank(message = "密码不能为空")
    @ApiModelProperty("管理员密码")
    private String password;


}
