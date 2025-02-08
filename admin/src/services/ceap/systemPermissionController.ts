// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取权限 GET /perms/get_permissions */
export async function getPermissions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPermissionsParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListSystemPermission>('/perms/get_permissions', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取权限规则页 POST /perms/rules */
export async function getRules(
  body: API.GetSystemPermissionPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageSystemPermission>('/perms/rules', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
