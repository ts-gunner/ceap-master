import React from 'react'
import { ModalForm, ProFormText, ProForm,ProFormSelect } from '@ant-design/pro-components';


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
export default function AddPermissionModal({ modalOpen, handleModalOpen, onSubmit }: ModalProps) {

    return (
        <ModalForm
            title='添加权限规则'
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
                            name="name"
                            label="权限名称"
                            tooltip=""
                            placeholder="请输入权限名称"
                            rules={requireRules}
                        ></ProFormText>
                        <ProFormText
                            width="md"
                            name="code"
                            label="权限规则"
                            tooltip=""
                            placeholder="请输入权限规则"
                            rules={requireRules}
                        ></ProFormText>
                    </ProForm.Group>

                </div>
            </div>


        </ModalForm>
    )
}
