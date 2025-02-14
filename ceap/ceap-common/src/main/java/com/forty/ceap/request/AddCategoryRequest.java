package com.forty.ceap.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.io.Serializable;


@Data
public class AddCategoryRequest implements Serializable {


    @NotBlank
    private String categoryName;

    @NotBlank
    private Integer categoryType;

    private static final long serialVersionUID = 1L;
}
