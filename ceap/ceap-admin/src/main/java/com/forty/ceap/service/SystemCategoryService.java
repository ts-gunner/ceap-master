package com.forty.ceap.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.forty.ceap.model.common.SystemCategory;

import java.util.List;

public interface SystemCategoryService extends IService<SystemCategory> {

    List<SystemCategory> getSystemCategorys(Integer categoryType, String categoryName);
}
