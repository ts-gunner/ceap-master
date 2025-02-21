import React, { useEffect, useRef, useState } from 'react'
import {
    ProForm,
    ProFormSwitch,
    ProFormGroup,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    StepsForm,
    PageContainer,
    ProFormDigit
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { message, Typography, Button, Image } from 'antd';
import AttachmentModal from '../AttachmentManage/AttachmentModal';
import { Dispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { addProductInfo } from '@/services/ceap/storeProductController';
import { history } from '@umijs/max';


export default function CreateProduct() {
    const formRef = useRef<ProFormInstance>();
    const dispatch = useDispatch<Dispatch>();
    const selectedFileIds = useSelector((state: RootState) => state.attachModel.selectedFileIds)
    const attachmentList = useSelector((state: RootState) => state.attachModel.attachmentList)
    const [attachmentModalOpen, handleAttachmentModalOpen] = useState(false)

    const [selectedPicture, handleSelectedPicture] = useState("")
    useEffect(() => {
        return () => {
            dispatch.attachModel.initialize()
        }
    }, [])

    const openAttachmentModal = () => {
        dispatch.attachModel.setSelectedLimit(1) // 只能选择一个照片当商品封面图
        dispatch.attachModel.clearSelectedFile()
        handleAttachmentModalOpen(true)
    }

    const submitCreateProduct = async (values: any) => {
        const resp = await addProductInfo({
            productImage: selectedPicture,
            storeName: values.storeName,
            description: values.description,
            keyword: values.keyword,
            unitName: values.unitName,
            price: values.price,
            otPrice: values.otPrice,
            stock: values.stock,
            isShow: values.isShow,
            isPostage: values.isPostage
        })
        if (resp.code === 200){
            message.success('提交成功');
            history.push("/product/manage")
        }
    }
    return (
        <PageContainer
            header={{
                title: "",
                breadcrumb: {}
            }}
        >
            <StepsForm
                formRef={formRef}
                onFinish={submitCreateProduct}
            >

                <StepsForm.StepForm<{
                    name: string;
                }>
                    name="base"
                    title="基本信息"
                    stepProps={{
                        description: '填写商品的基本信息',
                    }}
                    onFinish={async () => {
                        if (selectedPicture.length <= 0) {
                            message.error("请选择商品封面图")
                            return false;
                        }
                        return true;
                    }}
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
                    <ProFormGroup>
                        <ProFormTextArea
                            name="description"
                            label="商品描述"
                            width="md"
                            tooltip=""
                            placeholder="请输入商品描述"
                            rules={[{ required: true }]}
                        />
                        <Typography.Text>商品封面图：</Typography.Text>
                        {
                            selectedPicture.length > 0 ? <Image src={selectedPicture} width={100}></Image> :
                                null
                        }
                        <Button onClick={openAttachmentModal}>选择</Button>

                    </ProFormGroup>

                </StepsForm.StepForm>
                <StepsForm.StepForm<{
                    checkbox: string;
                }>
                    name="checkbox"
                    title="详细信息"
                    stepProps={{
                        description: '这里填入商品的详细信息',
                    }}
                    onFinish={async () => {
                        return true;
                    }}
                    initialValues={{
                        isShow: false,
                        isPostage: false
                    }}
                >
                    <ProFormGroup>
                        <ProFormDigit
                            label="库存"
                            name="stock"
                            width="sm"
                            rules={[
                                { required: true },
                                {
                                    pattern: /^\d+$/,
                                    message: '请输入一个整数',
                                },
                            ]}
                        />
                        <ProFormDigit
                            label="成本价"
                            name="otPrice"
                            width="sm"
                            rules={[{ required: true }]}
                        />
                        <ProFormDigit
                            label="售价"
                            name="price"
                            width="sm"
                            rules={[{ required: true }]}
                        />


                    </ProFormGroup>
                    <ProFormGroup>
                        <ProFormSwitch name="isShow" label="是否上架" />
                        <ProFormSwitch name="isPostage" label="是否包邮" />
                    </ProFormGroup>

                </StepsForm.StepForm>

            </StepsForm>

            <AttachmentModal
                modalOpen={attachmentModalOpen}
                handleModalOpen={handleAttachmentModalOpen}
                onSubmit={async () => {

                    const selectFile = attachmentList.filter((it) => selectedFileIds.includes(it.key))
                    handleSelectedPicture(selectFile[0].attDir)
                    handleAttachmentModalOpen(false)
                }}
            />
        </PageContainer>
    )
}
