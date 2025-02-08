import React from 'react'
import { ModalForm, ProFormText } from '@ant-design/pro-components';

type ModalProps = {
    modalOpen: boolean,
    handleModalOpen: any
    onSubmit: any
}
export default function AdminResetPasswordModal({ modalOpen, handleModalOpen, onSubmit }: ModalProps) {

    return (
        <ModalForm
            title='重置密码'
            width="20%"
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
                    <ProFormText.Password
                        width="md"
                        name="password"
                        label="新密码"
                        tooltip=""
                        placeholder="请输入密码"
                    ></ProFormText.Password>
                    <ProFormText.Password
                        width="md"
                        name="rePassword"
                        label="二次密码"
                        tooltip="请保证两次密码相同"
                        placeholder="请输入密码"

                    ></ProFormText.Password>
                </div>
            </div>


        </ModalForm>

    )
}
