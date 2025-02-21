import React, { useEffect, useRef, useState } from 'react'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Switch } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { getAdminProducts, offsellProduct, recycleProduct, upsellProduct } from '@/services/ceap/storeProductController';
import { history } from '@umijs/max';
import { Dispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';

type StoreProductType = {
  // 0: 出售中商品， 1： 仓库商品 2：售罄商品 3：商品回收站
  productType: number
}

export default function ProductTable({ productType }: StoreProductType) {
  const actionRef = useRef<ActionType>();
  const dispatch = useDispatch<Dispatch>();
  const columns: ProColumns<API.StoreProductVo>[] = [
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
      key: "image",
      title: '商品图',
      dataIndex: 'image',
      valueType: "image",
      hideInSearch: true,
      width: 120,
      align: "center",
    },
    {
      key: "storeName",
      title: '商品名称',
      dataIndex: 'storeName',
      width: 120,
      align: "center",
    },
    {
      key: "stock",
      title: '库存',
      dataIndex: 'stock',
      hideInSearch: true,
      width: 120,
      align: "center",
    },
    {
      key: "price",
      title: '售价',
      dataIndex: 'price',
      hideInSearch: true,
      width: 120,
      align: "center",
    },
    {
      key: "otPrice",
      title: '成本价',
      dataIndex: 'otPrice',
      hideInSearch: true,
      width: 150,
      align: "center",
    },
    {
      key: "sales",
      title: '销量',
      dataIndex: 'sales',
      hideInSearch: true,
      width: 120,
      align: "center",
    },
    {
      key: "isShow",
      title: '是否上架',
      dataIndex: 'isShow',
      hideInSearch: true,
      width: 120,
      align: "center",
      render: (text, record) => {
        return <Switch defaultChecked={text === true}
          onChange={async (checked: boolean) => {
            let resp;
            if (productType === 0) {
              resp = await offsellProduct({ productId: record.id || -1 })

            } else if (productType === 1) {
              resp = await upsellProduct({ productId: record.id || -1 })
            } else {
              message.error("操作失败，只允许仓库商品和出售中商品修改")
              return
            }
            if (resp.code === 200) {
              message.success(resp.msg)
              dispatch.productModel.refreshTabBadge()
              actionRef.current?.reload()
            }
          }} />
      }
    },

    {
      key: "createTime",
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
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
            修改
          </a>
          <a
            onClick={() => {

            }}
          >
            查看
          </a>
          {
            record.isRecycle ? <a
              onClick={async () => {
                const resp = await recycleProduct({
                  productId: record.id || -1,
                  isRecycle: false
                })
                if (resp.code === 200) {
                  message.success(resp.msg)
                  dispatch.productModel.refreshTabBadge()
                  actionRef.current?.reload()
                }
              }}
            >
              移回仓库
            </a> : <a
              onClick={async () => {
                const resp = await recycleProduct({
                  productId: record.id || -1,
                  isRecycle: true
                })
                if (resp.code === 200) {
                  message.success(resp.msg)
                  dispatch.productModel.refreshTabBadge()
                  actionRef.current?.reload()
                }
              }}
            >
              移入回收站
            </a>

          }

        </div>

      }
    }
  ]
  return (
    <div>
      <ProTable<API.StoreProductVo, API.GetStoreProductRequest>
        headerTitle='商品列表'
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        columns={columns}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              history.push("/product/createProduct");
            }}
          >
            <PlusOutlined /> 添加商品
          </Button>,
        ]}
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
