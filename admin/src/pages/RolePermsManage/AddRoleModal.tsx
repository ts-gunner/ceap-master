import React from 'react'
import { ModalForm, ProFormText, ProForm } from '@ant-design/pro-components';

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
export default function AddRoleModal({ modalOpen, handleModalOpen, onSubmit }: ModalProps) {
    return (
        <ModalForm
            title='添加角色'
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
                            name="roleName"
                            label="角色名称"
                            tooltip=""
                            placeholder="请输入角色名称"
                            rules={requireRules}
                        ></ProFormText>
                       
                    </ProForm.Group>

                </div>
            </div>


        </ModalForm>
    )
}
