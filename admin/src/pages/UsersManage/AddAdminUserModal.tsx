import React from 'react'
import { ModalForm, ProFormText, ProForm,ProFormSelect } from '@ant-design/pro-components';
import { getRoleList } from '@/services/ceap/systemRoleController';
import { message } from 'antd';

type ModalProps = {
    modalOpen: boolean,
    handleModalOpen: any
    onSubmit: any
}

const requireRules = [
    {
        required: true,
        message: '为必填项',
    },
]
export default function AddAdminUserModal({ modalOpen, handleModalOpen, onSubmit }: ModalProps) {

    return (
        <ModalForm
            title='添加管理员'
            width="50%"
            open={modalOpen}
            onOpenChange={handleModalOpen}
            onFinish={onSubmit}
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
                            name="account"
                            label="账号"
                            tooltip=""
                            placeholder="请输入账号"
                            rules={requireRules}
                        ></ProFormText>
                        <ProFormText.Password
                            width="md"
                            name="password"
                            label="密码"
                            tooltip=""
                            placeholder="请输入密码"
                            rules={requireRules}
                        ></ProFormText.Password>
                    </ProForm.Group>

                    <ProForm.Group>
                        <ProFormText
                            width="md"
                            name="realName"
                            label="昵称"
                            tooltip=""
                            placeholder="请输入昵称"
                            rules={requireRules}
                        ></ProFormText>
                        <ProFormSelect
                            label="角色"
                            rules={requireRules}
                            width="md"
                            mode="multiple"
                            name="roleId"
                            request={async () => {
                                const response = await getRoleList({roleName: "", status: true})
                                let options: { label: string, value: number }[] = []
                                if (response.code === 200) {
                                    response.data?.map((item) => {
                                        options.push({
                                            label: item.roleName || "",
                                            value: item.id || -1
                                        })
                                    })
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
