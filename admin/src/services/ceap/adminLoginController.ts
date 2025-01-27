// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取用户详情 GET /auth/get_admin_info */
export async function getAdminInfo(options?: { [key: string]: any }) {
  return request<API.BaseResponseSystemAdminVo>('/auth/get_admin_info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /auth/get_menus */
export async function getMenuList(options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/auth/get_menus', {
    method: 'GET',
    ...(options || {}),
  });
}

/** PC端登录 POST /auth/signin */
export async function adminLogin(body: API.AdminLoginRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseString>('/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** PC端退出登录 GET /auth/signout */
export async function adminLogout(options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/auth/signout', {
    method: 'GET',
    ...(options || {}),
  });
}
