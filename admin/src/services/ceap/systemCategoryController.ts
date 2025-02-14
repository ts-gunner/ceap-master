// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加类别 POST /category/add */
export async function addCategory(body: API.AddCategoryRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/category/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询类别 GET /category/search */
export async function getCategoryList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCategoryListParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListSystemCategory>('/category/search', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
