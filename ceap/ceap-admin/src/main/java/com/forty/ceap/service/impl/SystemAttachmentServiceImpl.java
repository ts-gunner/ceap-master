package com.forty.ceap.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.forty.ceap.enums.ErrorCode;
import com.forty.ceap.exception.BusinessException;
import com.forty.ceap.mapper.AttachmentCategoryMapper;
import com.forty.ceap.mapper.SystemAttachmentMapper;
import com.forty.ceap.model.common.AttachmentCategory;
import com.forty.ceap.model.common.SystemAttachment;
import com.forty.ceap.model.common.SystemCategory;
import com.forty.ceap.request.GetSystemAttachmentRequest;
import com.forty.ceap.service.SystemAttachmentService;
import com.forty.ceap.service.SystemCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class SystemAttachmentServiceImpl extends ServiceImpl<SystemAttachmentMapper, SystemAttachment> implements SystemAttachmentService {

    @Autowired
    SystemCategoryService systemCategoryService;

    @Autowired
    AttachmentCategoryMapper attachmentCategoryMapper;

    @Override
    @Transactional(rollbackFor = BusinessException.class)
    public void saveUploadedAttachment(SystemAttachment systemAttachment, String categoryIds) {

        this.save(systemAttachment);

        // 保存标签
        if (StrUtil.isNotEmpty(categoryIds)){
            List<Integer> categoryIdList = Arrays.stream(categoryIds.split(",")).map(Integer::parseInt).toList();

            List<SystemCategory> categories = systemCategoryService.list(
                    new QueryWrapper<SystemCategory>().in("id", categoryIdList)
            );
            if (categories.size() != categoryIdList.size()) {
                throw new BusinessException(ErrorCode.PARAM_ERROR, "部分标签查询失败");
            }
            List<AttachmentCategory> insertData = new ArrayList<>();
            categoryIdList.forEach(it -> {
                AttachmentCategory attachmentCategory = new AttachmentCategory();
                attachmentCategory.setAid(systemAttachment.getId());
                attachmentCategory.setCid(it);
                insertData.add(attachmentCategory);
            });

            attachmentCategoryMapper.insert(insertData);
        }


    }

    @Override
    public List<SystemAttachment> getUploadedAttachments(GetSystemAttachmentRequest request) {
        QueryWrapper<SystemAttachment> attachmentQueryWrapper = new QueryWrapper<>();

        // 如果用户选择了标签
        if (StrUtil.isNotEmpty(request.getCategoryIds())){
            List<Integer> categoryIds = Arrays.stream(request.getCategoryIds().split(",")).map(Integer::parseInt).toList();
            List<AttachmentCategory> attachmentCategories = attachmentCategoryMapper.selectList(new QueryWrapper<AttachmentCategory>().in("cid", categoryIds));
            List<Integer> attachmentIds = attachmentCategories.stream().map(AttachmentCategory::getAid).distinct().toList();
            if (attachmentIds.isEmpty()){
                return List.of();
            }
            attachmentQueryWrapper.in("id", attachmentIds);
        }

        return this.list(attachmentQueryWrapper);
    }
}
