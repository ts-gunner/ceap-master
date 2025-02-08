package com.forty.ceap.request;


import lombok.Data;

@Data
public class ResetAdminPasswordRequest {

    private Integer userId;

    private String password;

    private String rePassword;
}
