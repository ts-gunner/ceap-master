// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 管理员获取订单信息 POST /orders/get_orders */
export async function getAdminOrders(
  body: API.GetStoreOrderRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStoreOrder>('/orders/get_orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
