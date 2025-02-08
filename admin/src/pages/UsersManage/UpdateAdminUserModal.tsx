import React, { useState, useEffect } from 'react'
import { ModalForm, ProFormText, ProForm, ProFormSelect } from '@ant-design/pro-components';
import { getRoleList } from '@/services/ceap/systemRoleController';
import { message } from 'antd';

type ModalProps = {
    modalOpen: boolean,
    handleModalOpen: any
    onSubmit: any,
    values: Partial<API.SystemAdminPageVo>
}

export default function UpdateAdminUserModal({ modalOpen, handleModalOpen, onSubmit, values }: ModalProps) {
    // 强制刷新Modal，更新初始化值
    const [key, setKey] = useState(0)
    useEffect(() => {
        setKey(key + 1)
    }, [values])
    return (
        <ModalForm
            key={key}
            title='更新管理员信息'
            width="70%"
            open={modalOpen}
            onOpenChange={handleModalOpen}
            onFinish={onSubmit}
            initialValues={{
                ...values,
                roleId: values.roles?.split(",").map(item => parseInt(item))
            }}
        >

            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div>
                    <ProForm.Group>
                        <ProFormText
                            width="md"
                            name="realName"
                            label="昵称"
                            tooltip=""
                            placeholder="请输入昵称"
                        ></ProFormText>
                        <ProFormText
                            width="md"
                            name="email"
                            label="邮箱"
                            tooltip=""
                            placeholder="请输入邮箱"
                        ></ProFormText>
                        <ProFormText
                            width="md"
                            name="phone"
                            label="手机号码"
                            tooltip=""
                            placeholder="请输入手机号码"
                        ></ProFormText>
                    </ProForm.Group>

                    <ProForm.Group>
                        <ProFormSelect
                            width="md"
                            name="isSms"
                            label="是否接收短信"
                            tooltip=""
                            request={async () => {
                                return [
                                    {
                                        label: "是",
                                        value: true
                                    },
                                    {
                                        label: "否",
                                        value: false
                                    },
                                ]
                            }}
                        ></ProFormSelect>
                        <ProFormSelect
                            width="md"
                            name="status"
                            label="状态"
                            tooltip=""
                            request={async () => {
                                return [
                                    {
                                        label: "正常",
                                        value: true
                                    },
                                    {
                                        label: "停用",
                                        value: false
                                    },
                                ]
                            }}
                        ></ProFormSelect>
                        <ProFormSelect
                            label="角色"
                            width="md"
                            mode="multiple"
                            name="roleId"
                            request={async () => {
                                const response = await getRoleList({ roleName: "", status: true })
                                let options: { label: string, value: number }[] = []
                                if (response.code === 200) {
                                    response.data?.map((item) => {
                                        options.push({
                                            label: item.roleName || "",
                                            value: item.id || -1
                                        })
                                    })
                                }
                                else {
                                    message.error("无法获取角色列表：" + response.msg)
                                }
                                return options
                            }}

                        />

                    </ProForm.Group>


                </div>
            </div>


        </ModalForm>
    )
}
