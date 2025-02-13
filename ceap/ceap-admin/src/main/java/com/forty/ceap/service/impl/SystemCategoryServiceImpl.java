package com.forty.ceap.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.forty.ceap.mapper.SystemCategoryMapper;
import com.forty.ceap.model.common.SystemCategory;
import com.forty.ceap.service.SystemCategoryService;
import org.springframework.stereotype.Service;


@Service
public class SystemCategoryServiceImpl extends ServiceImpl<SystemCategoryMapper, SystemCategory> implements SystemCategoryService {
}
