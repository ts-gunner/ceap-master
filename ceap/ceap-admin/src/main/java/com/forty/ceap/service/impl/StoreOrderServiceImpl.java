package com.forty.ceap.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.forty.ceap.mapper.StoreOrderMapper;
import com.forty.ceap.model.commerce.StoreOrder;
import com.forty.ceap.service.StoreOrderService;
import org.springframework.stereotype.Service;

@Service
public class StoreOrderServiceImpl extends ServiceImpl<StoreOrderMapper, StoreOrder> implements StoreOrderService {


}
