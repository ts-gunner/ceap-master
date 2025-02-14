package com.forty.ceap.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.forty.ceap.mapper.SystemCategoryMapper;
import com.forty.ceap.model.common.SystemCategory;
import com.forty.ceap.service.SystemCategoryService;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class SystemCategoryServiceImpl extends ServiceImpl<SystemCategoryMapper, SystemCategory> implements SystemCategoryService {


    @Override
    public List<SystemCategory> getSystemCategorys(Integer categoryType, String categoryName) {
        QueryWrapper<SystemCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(categoryType != null, "type", categoryType);
        queryWrapper.eq(StrUtil.isNotEmpty(categoryName), "name", categoryName);
        return this.list(queryWrapper);
    }
}
