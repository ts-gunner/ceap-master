import React, { useEffect, useRef, useState } from 'react'
import { ProTable } from '@ant-design/pro-components'
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { getAdminOrders } from '@/services/ceap/storeOrderController';
import { getAdminProducts } from '@/services/ceap/storeProductController';

type StoreProductType = {
  // 0: 出售中商品， 1： 仓库商品 2：售罄商品 3：商品回收站
  productType: number
}

export default function ProductTable({productType}: StoreProductType) {
    const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.StoreOrder>[] = [
    {
      key: "id",
      title: 'id',
      dataIndex: 'id',
      align: "center",
      width: 50,
      hideInSearch: true,
      hideInTable: true
    },
    {
      key: "orderId",
      title: '订单号',
      dataIndex: 'orderId',
      width: 120,
      align: "center",
    },
    {
      key: "orderType",
      title: '订单类型',
      dataIndex: 'orderType',
      width: 120,
      align: "center",
    },
    {
      key: "realName",
      title: '收货人',
      dataIndex: 'realName',
      width: 120,
      align: "center",
    },
    {
      key: "good",
      title: '商品信息',
      dataIndex: 'good',
      width: 150,
      align: "center",
    },
    {
      key: "payPrice",
      title: '实际支付',
      dataIndex: 'payPrice',
      width: 120,
      align: "center",
    },
    {
      key: "payType",
      title: '支付方式',
      dataIndex: 'payType',
      width: 120,
      align: "center",
    },
    {
      key: "status",
      title: '订单状态',
      dataIndex: 'status',
      width: 100,
      align: "center",
    },
    {
      key: "createTime",
      title: '下单时间',
      dataIndex: 'createTime',
      width: 100,
      align: "center",
    },
    {
      key: 'option',
      title: '操作',
      dataIndex: 'option',
      align: "center",
      width: 150,
      fixed: "right",
      hideInSearch: true,
      render: (_, record) => {
          return <div style={{
              display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem"
          }}>
              <a
                  onClick={() => {
                  
                  }}
              >
                  查看
              </a>
            
          </div>

      }
  }
  ]
  return (
    <div>
        <ProTable<API.StoreProduct, API.GetStoreProductRequest>
                headerTitle='商品列表'
                actionRef={actionRef}
                rowKey="id"
                search={{
                  labelWidth: 120,
                }}
                columns={columns}
                request={
                  async (params) => {
                    const response = await getAdminProducts({
                      currentPage: params.current,
                      pageSize: params.pageSize,
                      productType: productType
                    })
                  
                    return {
                      data: response.data?.records,
                      // success 请返回 true，
                      // 不然 table 会停止解析数据，即使有数据
                      success: response.code === 200,
                      // 不传会使用 data 的长度，如果是分页一定要传
                      total: response.data?.total,
                    }
                  }
                }
              />
        
    </div>
  )
}
