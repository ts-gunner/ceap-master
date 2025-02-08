import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import AdminUsers from './AdminUsers'
import AppUsers from './AppUsers'
const tabList = [
    {
        tab: '管理端用户',
        key: 'admin_users',
        component: <AdminUsers />
    },
    {
        tab: '客户端用户',
        key: 'app_users',
        component: <AppUsers />
    },
]
export default function UsersManage() {
    const [tabKey,setTabKey] = useState(tabList[0].key)

    return (
        <PageContainer
            loading={false}
            header={{
                title: '',
                breadcrumb: {},
            }}
            tabList={tabList}
            onTabChange={(key:string) => setTabKey(key) }
        >
            {tabList.find(tab => tab.key == tabKey)?.component}
        </PageContainer>
    )
}
