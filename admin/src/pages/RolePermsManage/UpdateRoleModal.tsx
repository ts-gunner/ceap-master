import React, { useState, useEffect } from 'react'
import { ModalForm, ProFormText, ProForm } from '@ant-design/pro-components';

type ModalProps = {
    modalOpen: boolean,
    handleModalOpen: any
    onSubmit: any
    values: Partial<API.SystemRole>
}

const requireRules = [
    {
        required: true,
        message: '为必填项',
    },
]
export default function UpdateRoleModal({ modalOpen, handleModalOpen, onSubmit, values }: ModalProps) {
    // 强制刷新Modal，更新初始化值
    const [key, setKey] = useState(0)
    useEffect(() => {
        setKey(key + 1)
    }, [values])

    return (
        <ModalForm
            key={key}
            title='更新角色'
            width="50%"
            open={modalOpen}
            onOpenChange={handleModalOpen}
            onFinish={onSubmit}
            initialValues={values}
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
