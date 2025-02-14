// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询附件 POST /attachment/search */
export async function getUploadedAttachmentList(
  body: API.GetSystemAttachmentRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListSystemAttachment>('/attachment/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 上传附件 POST /attachment/upload */
export async function uploadAttachmentFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadAttachmentFileParams,
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseObject>('/attachment/upload', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
