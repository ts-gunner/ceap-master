import React, { useEffect, useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import { Badge } from 'antd'
import ProductTable from './ProductTable'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from '@/store'
import OnSaleProduct from './OnSaleProduct'
import OnStoreProduct from './OnStoreProduct'
import SellOutProduct from './SellOutProduct'
import RecycleProduct from './RecycleProduct'


export default function ProductManage() {
  const tabBadge = useSelector((state:RootState) => state.productModel.tabBadge)
  const dispatch = useDispatch<Dispatch>()
  const tabList = [
    {
      tab: <Badge count={tabBadge[0]} offset={[15, 0]}>出售中商品</Badge>,
      key: 'onSaleProduct',
      component: <OnSaleProduct />
    },
    {
      tab: <Badge count={tabBadge[1]} offset={[15, 0]}>仓库商品</Badge>,
      key: 'onStoreProduct',
      component: <OnStoreProduct />
    },
    {
      tab: <Badge count={tabBadge[2]} offset={[15, 0]}>售罄商品</Badge>,
      key: 'SellOutProduct',
      component: <SellOutProduct />
    },
    {
      tab: <Badge count={tabBadge[3]} offset={[15, 0]}>商品回收站</Badge>,
      key: 'RecycleProduct',
      component: <RecycleProduct />
    }
  ]

  const [tabKey, setTabKey] = useState(tabList[0].key)
  useEffect(() => {
    dispatch.productModel.refreshTabBadge()
  }, [])
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
