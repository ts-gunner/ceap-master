// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加管理员账号 POST /admins/add_admin_user */
export async function addAdminAccount(
  body: API.AddSystemAdminRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject>('/admins/add_admin_user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取管理端用户列表 POST /admins/get_admins */
export async function getAdmins(
  body: API.GetSystemAdminListRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageSystemAdminPageVo>('/admins/get_admins', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 重置管理员密码 POST /admins/reset_password */
export async function resetAdminPassword(
  body: API.ResetAdminPasswordRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject>('/admins/reset_password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新管理员信息 POST /admins/update_admin_info */
export async function updateAdminInfo(
  body: API.UpdateAdminInfoRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject>('/admins/update_admin_info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
