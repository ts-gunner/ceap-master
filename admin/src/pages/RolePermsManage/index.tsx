import React, { useEffect, useRef, useState } from 'react'
import { PageContainer, ProTable } from '@ant-design/pro-components'
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, message, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addRole, getRoleListByPage, updateRoleInfo } from '@/services/ceap/systemRoleController';
import AddRoleModal from './AddRoleModal';
import UpdateRoleModal from './UpdateRoleModal';
import RoleAccessPermsModal from './RoleAccessPermsModal';
import { getPermissions } from '@/services/ceap/systemPermissionController';

export default function RolePermsManage() {
    const actionRef = useRef<ActionType>();
    const [currentData, setCurrentData] = useState<API.SystemRole>({})
    const [addRoleModalOpen, handleAddRoleModalOpen] = useState(false)
    const [updateRoleModalOpen, handleUpdateRoleModalOpen] = useState(false)
    const [roleAccessModalOpen, handleRoleAccessModalOpen] = useState(false)
    const [permissions, setPermissions] = useState<Array<API.SystemPermission>>([])
    
    const columns: ProColumns<API.SystemRole>[] = [
        {
            key: "id",
            title: 'id',
            dataIndex: 'id',
            align: "center",
            width: 50,
            hideInSearch: true,
        },
        {
            key: "roleName",
            title: '角色名称',
            dataIndex: 'roleName',
            width: 120,
            align: "center",
        },
        {
            key: "status",
            title: '状态',
            width: 100,
            dataIndex: 'status',
            align: "center",
            valueEnum: {
                "true": {
                    text: "正常",
                    status: "Success"
                },
                "false": {
                    text: "停用",
                    status: "Error"
                },
            }
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
                            setCurrentData(record)
                            handleRoleAccessModalOpen(true)
                        }}
                    >
                        授权
                    </a>
                    <a
                        onClick={() => {
                            setCurrentData(record)
                            handleUpdateRoleModalOpen(true)
                        }}
                    >
                        修改
                    </a>
                </div>

            }
        }
    ]
    useEffect(() => {
        getPermissionList()

    }, [])
    const getPermissionList = async () => {
        const resp = await getPermissions({roleId: -1})
        if (resp.code === 200){
            setPermissions(resp.data || [])
        }else {
            message.error("权限获取失败：" + resp.msg)
        }
    }
    return (
        <PageContainer
            header={{
                title: '角色权限管理',
                breadcrumb: {},
            }}
        >

            <ProTable<API.SystemRole, API.GetRolesPageRequest>
                headerTitle='角色列表'
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
                            handleAddRoleModalOpen(true);
                        }}
                    >
                        <PlusOutlined /> 新建
                    </Button>,
                ]}
                request={
                    async (params) => {
                        const response = await getRoleListByPage({
                            currentPage: params.current,
                            pageSize: params.pageSize,
                            roleName: params.roleName,
                            status: params.status

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

            <AddRoleModal
                modalOpen={addRoleModalOpen}
                handleModalOpen={handleAddRoleModalOpen}
                onSubmit={async (values: any) => {
                    const resp = await addRole({
                        roleName: values.roleName
                    })
                    if (resp.code === 200) {
                        message.success("添加成功！！")
                    } else {
                        message.error(resp.msg)
                    }
                    actionRef.current?.reload()
                    handleAddRoleModalOpen(false)
                }}

            />
            <UpdateRoleModal
                modalOpen={updateRoleModalOpen}
                handleModalOpen={handleUpdateRoleModalOpen}
                onSubmit={async (values: any) => {
                    
                    const resp = await updateRoleInfo({
                        roleId: currentData.id,
                        roleName: values.roleName
                    })
                    if (resp.code === 200) {
                        message.success("添加成功！！")
                    } else {
                        message.error(resp.msg)
                    }
                    actionRef.current?.reload()
                    handleUpdateRoleModalOpen(false)
                }}
                values={currentData}

            />

            <RoleAccessPermsModal
                modalOpen={roleAccessModalOpen}
                handleModalOpen={handleRoleAccessModalOpen}
                values={{
                    ...currentData,
                    permissions: permissions
                }}
                
            ></RoleAccessPermsModal>
        </PageContainer>
    )
}
