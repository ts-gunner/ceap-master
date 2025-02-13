package com.forty.ceap.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.forty.ceap.mapper.SystemAttachmentMapper;
import com.forty.ceap.model.common.SystemAttachment;
import com.forty.ceap.service.SystemAttachmentService;
import org.springframework.stereotype.Service;

@Service
public class SystemAttachmentServiceImpl extends ServiceImpl<SystemAttachmentMapper, SystemAttachment> implements SystemAttachmentService {
}
