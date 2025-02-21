// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 管理员添加商品信息 POST /product/add_products */
export async function addProductInfo(
  body: API.AddProductRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject>('/product/add_products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取商品标签头的数据量 GET /product/get_product_tab_badge */
export async function getProductTabBadge(options?: { [key: string]: any }) {
  return request<API.BaseResponseMapIntegerInteger>('/product/get_product_tab_badge', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 管理员获取商品信息 POST /product/get_products */
export async function getAdminProducts(
  body: API.GetStoreProductRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageStoreProductVo>('/product/get_products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 下加商品 GET /product/offsell_products */
export async function offsellProduct(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.offsellProductParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject>('/product/offsell_products', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 商品移入移出回收站 GET /product/recycle_product */
export async function recycleProduct(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.recycleProductParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject>('/product/recycle_product', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 上架商品 GET /product/upsell_products */
export async function upsellProduct(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.upsellProductParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject>('/product/upsell_products', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
