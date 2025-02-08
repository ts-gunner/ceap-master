package com.forty.ceap.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.forty.ceap.mapper.StoreProductMapper;
import com.forty.ceap.model.commerce.StoreProduct;
import com.forty.ceap.service.StoreProductService;
import org.springframework.stereotype.Service;

@Service
public class StoreProductServiceImpl extends ServiceImpl<StoreProductMapper, StoreProduct>
        implements StoreProductService {

}
