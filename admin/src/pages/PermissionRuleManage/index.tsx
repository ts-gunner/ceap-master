import React, { useRef, useState } from 'react'
import { PageContainer,ProTable } from '@ant-design/pro-components'
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, message, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getRules } from '@/services/ceap/systemPermissionController';
// import AddPermissionModal from './AddPermissionModal';

export default function PermissionRuleManage() {
    const actionRef = useRef<ActionType>();
    // const [addPermsModalOpen, handleAddPermsModalOpen] = useState(false)
    const columns: ProColumns<API.SystemPermission>[] = [
        {
            key: "id",
            title: 'id',
            dataIndex: 'id',
            hideInSearch: true,
            hideInTable: true,
        },
        {
            key: "name",
            title: '权限名称',
            dataIndex: 'name',
            align: "center",
        },
        {
            key: "code",
            title: '权限代码',
            dataIndex: 'code',
            align: "center",
        },
    ]
    return (
        <PageContainer
            header={{
                title: '权限规则',
                breadcrumb: {},
            }}
        >
            <ProTable<API.SystemPermission>
                headerTitle='权限规则列表'
                actionRef={actionRef}
                rowKey="id"
                search={{
                    labelWidth: 120,
                }}
                columns={columns}
                // toolBarRender={() => [
                //     <Button
                //         type="primary"
                //         key="primary"
                //         onClick={() => {
                //             handleAddPermsModalOpen(true);
                //         }}
                //     >
                //         <PlusOutlined /> 新建
                //     </Button>,
                // ]}
                request={
                    async (params) => {
                        console.log(params)
                        const response = await getRules({
                            currentPage: params.current,
                            pageSize: params.pageSize,
                            permissionName: params?.name,
                            permissionCode: params?.code,
                        })
                        if (response.code !== 200) {
                            message.error(response.msg)
                        }
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

            {/* <AddPermissionModal
                modalOpen={addPermsModalOpen}
                handleModalOpen={handleAddPermsModalOpen}
                onSubmit={async (values: any) => {
                    actionRef.current?.reload()
                    handleAddPermsModalOpen(false)
                }}

            ></AddPermissionModal> */}

        </PageContainer>
    )
}
