package com.forty.ceap.controller;


import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.forty.ceap.api.tencent.CosObjectStore;
import com.forty.ceap.constants.GlobalConstant;
import com.forty.ceap.enums.ErrorCode;
import com.forty.ceap.exception.BusinessException;
import com.forty.ceap.mapper.AttachmentCategoryMapper;
import com.forty.ceap.model.common.SystemAttachment;
import com.forty.ceap.property.CeapCoreConfig;
import com.forty.ceap.property.TencentApiConfig;
import com.forty.ceap.request.GetSystemAttachmentRequest;
import com.forty.ceap.response.BaseResponse;
import com.forty.ceap.security.TokenManager;
import com.forty.ceap.service.SystemAttachmentService;
import com.forty.ceap.utils.FileUtils;
import com.forty.ceap.vo.LoginAdminVo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/attachment")
@Tag(name="SystemAttachmentController", description = "管理端附件服务")
public class SystemAttachmentController {

    @Autowired
    SystemAttachmentService systemAttachmentService;

    @Resource
    TokenManager tokenManager;

    @Autowired
    CeapCoreConfig ceapCoreConfig;

    @PreAuthorize("hasAuthority('admin:attachment:search')")
    @PostMapping("/search")
    @Operation(description = "查询附件")
    public BaseResponse<List<SystemAttachment>> getUploadedAttachmentList(@RequestBody GetSystemAttachmentRequest request) {
        return new BaseResponse<>(systemAttachmentService.getUploadedAttachments(request));
    }

    @PreAuthorize("hasAuthority('admin:attachment:upload')")
    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    @Operation(description = "上传附件")
    public BaseResponse<Object> uploadAttachmentFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("categoryIds") String categoryIds,
            HttpServletRequest request
    ) {
        TencentApiConfig tencentConfig = ceapCoreConfig.getTencent();
        long fileSize = file.getSize();

        String fileExtension = FileUtils.getFileExtension(file.getOriginalFilename());
        try {
            File tempFile = File.createTempFile(file.getOriginalFilename(), ".tmp");
            file.transferTo(tempFile);
            // 上传到对象存储
            CosObjectStore cosObjectStore = new CosObjectStore(tencentConfig);
            String url = cosObjectStore.putObject(
                    tencentConfig.getObjectStore().getSaveDirPath() + file.getOriginalFilename(),
                    tempFile
            );
            SystemAttachment systemAttachment = new SystemAttachment();
            LoginAdminVo loginAdminVo = tokenManager.getLoginAdminVo(request);
            systemAttachment.setAttName(file.getOriginalFilename());
            systemAttachment.setAttSize(FileUtils.convertFileSize(fileSize));
            systemAttachment.setAttType(fileExtension);
            systemAttachment.setAttDir(url);
            systemAttachment.setUserId(loginAdminVo.getSystemAdmin().getId());
            systemAttachment.setUploader(loginAdminVo.getSystemAdmin().getRealName());
            systemAttachmentService.saveUploadedAttachment(systemAttachment,categoryIds);

        } catch (IOException e) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, e.getMessage());
        }
        return new BaseResponse<>();
    }
    
}
