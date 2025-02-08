// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加角色 GET /role/add_role */
export async function addRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addRoleParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject>('/role/add_role', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 给角色添加权限或者取消授权 POST /role/role_add_perms */
export async function addRolePerms(
  body: API.RoleAddPermissionRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject>('/role/role_add_perms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询角色列表 GET /role/search_roles */
export async function getRoleList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoleListParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListSystemRole>('/role/search_roles', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询角色列表页 POST /role/search_roles_page */
export async function getRoleListByPage(
  body: API.GetRolesPageRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageSystemRole>('/role/search_roles_page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新角色 POST /role/update_role */
export async function updateRoleInfo(
  body: API.UpdateSystemRoleRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject>('/role/update_role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
