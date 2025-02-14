package com.forty.ceap.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

@Data
@ApiModel(description = "查询附件服务")
public class GetSystemAttachmentRequest implements Serializable {

    private String categoryIds;

}
