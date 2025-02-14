package com.forty.ceap.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.forty.ceap.model.common.SystemAttachment;
import com.forty.ceap.request.GetSystemAttachmentRequest;

import java.util.List;

public interface SystemAttachmentService extends IService<SystemAttachment> {

    void saveUploadedAttachment(SystemAttachment systemAttachment, String categoryIds);


    List<SystemAttachment> getUploadedAttachments(GetSystemAttachmentRequest request);
}
