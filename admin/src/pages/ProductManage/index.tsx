import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import OnSaleProduct from './OnSaleProduct'
import OnStoreProduct from './OnStoreProduct'
import SellOutProduct from './SellOutProduct'
import RecycleProduct from './RecycleProduct'
const tabList = [
  {
    tab: '出售中商品',
    key: 'onSaleProduct',
    component: <OnSaleProduct />
  },
  {
    tab: '仓库商品',
    key: 'onStoreProduct',
    component: <OnStoreProduct />
  },
  {
    tab: '售罄商品',
    key: 'SellOutProduct',
    component: <SellOutProduct />
  },
  {
    tab: '商品回收站',
    key: 'RecycleProduct',
    component: <RecycleProduct />
  }
]
export default function ProductManage() {

  const [tabKey, setTabKey] = useState(tabList[0].key)
  return (
    <PageContainer
      loading={false}
      header={{
        title: '',
        breadcrumb: {},
      }}
      tabList={tabList}
      onTabChange={(key: string) => setTabKey(key)}
    >
      {tabList.find(tab => tab.key == tabKey)?.component}
    </PageContainer>
  )
}
