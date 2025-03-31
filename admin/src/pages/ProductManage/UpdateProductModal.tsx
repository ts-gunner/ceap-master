import React, { useState, useEffect } from 'react'
import {
    ModalForm,
    ProFormSwitch,
    ProFormGroup,
    ProFormText,
    ProFormTextArea,
    StepsForm,
    ProFormDigit
} from '@ant-design/pro-components';

type ModalProps = {
    modalOpen: boolean,
    handleModalOpen: any
    onSubmit: any
    values: any
}

const requireRules = [
    {
        required: true,
        message: '为必填项',
    },
]

export default function UpdateProductModal({ modalOpen, handleModalOpen, onSubmit, values }: ModalProps) {
    // 强制刷新Modal，更新初始化值
    const [key, setKey] = useState(0)

    useEffect(() => {
        setKey(key + 1)
    }, [values])
    return (
        <div>
            <ModalForm
                title='更新商品信息'
                width="80%"
                open={modalOpen}
                onOpenChange={handleModalOpen}
                onFinish={onSubmit}
                initialValues={values}
            >
                <ProFormGroup>
                    <ProFormText
                        name="storeName"
                        label="商品名称"
                        width="md"
                        tooltip=""
                        placeholder="请输入商品名称"
                        rules={[{ required: true }]}
                    />
                    <ProFormText
                        name="keyword"
                        label="商品关键字"
                        width="md"
                        tooltip=""
                        placeholder="请输入商品关键字"
                        rules={[{ required: true }]}
                    />
                </ProFormGroup>
                <ProFormGroup>
                    <ProFormText
                        name="categoryId"
                        label="商品分类"
                        width="md"
                        tooltip=""
                        placeholder="请选择商品分类"
                        rules={[{ required: true }]}
                    />
                    <ProFormText
                        name="unitName"
                        label="单位"
                        width="md"
                        tooltip=""
                        placeholder="请输入商品单位"
                        rules={[{ required: true }]}
                    />
                </ProFormGroup>



            </ModalForm>
        
        </div>

    )
}
