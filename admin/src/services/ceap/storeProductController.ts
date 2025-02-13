// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 管理员获取商品信息 POST /product/get_products */
export async function getAdminProducts(
  body: API.GetStoreProductRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStoreProduct>('/product/get_products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
