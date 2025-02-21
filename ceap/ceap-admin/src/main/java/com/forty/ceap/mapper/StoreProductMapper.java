package com.forty.ceap.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.forty.ceap.model.commerce.StoreProduct;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface StoreProductMapper extends BaseMapper<StoreProduct> {

    Map<Integer, Integer> getProductBadgeCount();
}
