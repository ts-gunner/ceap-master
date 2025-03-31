import React, { useState } from 'react'
import {
    PageContainer,
} from '@ant-design/pro-components';
import { message} from 'antd';

import { addProductInfo } from '@/services/ceap/storeProductController';
import { history } from '@umijs/max';
import HandleProductComponent from './HandleProductComponent';

export default function CreateProduct() {

    const [selectedPicture, handleSelectedPicture] = useState("")



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
           <HandleProductComponent 
                onFinish={submitCreateProduct}
                selectedPicture={selectedPicture}
                handleSelectedPicture={handleSelectedPicture}
           />
        </PageContainer>
    )
}
