import React, { useEffect, useState } from 'react'
import { Flex, Tag, Typography, Input, Card, Image, Upload, Button, Select, Spin, Tooltip } from 'antd';
import { attachmentConstants } from '../../constants/common';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import Button1 from '@/components/button/Button1';
import { ModalForm } from '@ant-design/pro-components';
import type { UploadProps } from 'antd';



export default function AttachmentTable() {
    const dispatch = useDispatch<Dispatch>()
    const uploadFileModalOpen = useSelector((state: RootState) => state.attachModel.uploadFileModalOpen)
    const selectedTags = useSelector((state: RootState) => state.attachModel.selectedTags)
    const selectedCategory = useSelector((state: RootState) => state.attachModel.selectedCategory)
    const categoryList = useSelector((state: RootState) => state.attachModel.categoryList)
    const selectedFileIds = useSelector((state: RootState) => state.attachModel.selectedFileIds)
    const attachmentList = useSelector((state: RootState) => state.attachModel.attachmentList)
    const attachmentLoading = useSelector((state: RootState) => state.attachModel.attachmentLoading)
    const uploadLoading = useSelector((state: RootState) => state.attachModel.uploadLoading)
    const uploadList = useSelector((state: RootState) => state.attachModel.uploadList)
    const handleChange = (tag: string, checked: boolean) => {
        dispatch.attachModel.setSelectedTags({ tag, checked })
    };
    const handleUploadChange: UploadProps['onChange'] = (info) => {
        let newFileList = [...info.fileList];
        dispatch.attachModel.setUploadFileList(newFileList)
    }
    useEffect(() => {
        dispatch.attachModel.getAttachmentList(null)
    }, [])


    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Flex gap={4} wrap align="center">
                    <Typography.Text style={{ marginRight: "1rem" }}>文件类型: </Typography.Text>
                    {attachmentConstants.ATTACHMENT_TAGS.map((tag) => {
                        return (
                            <Tag.CheckableTag
                                key={tag.key}
                                checked={selectedTags.includes(tag.key)}
                                onChange={(checked) => handleChange(tag.key, checked)}
                            >
                                {tag.label}
                            </Tag.CheckableTag>
                        )
                    })}
                </Flex>

                <div>
                    <Input.Search loading={false} />
                </div>

            </div>
            <div style={{
                display: "flex", gap: 10, marginTop: "20px"
            }}>

                <Button1 buttonText='上传附件' onClick={
                    () => dispatch.attachModel.handleUploadFileModalOpen(true)
                } />



            </div>
            <Spin spinning={attachmentLoading}>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 20,
                    marginTop: "2rem"
                }}>
                    {
                        attachmentList.filter((item) => {
                            let filenameArr = item.filename.split(".")
                            let fileExtension = filenameArr[filenameArr.length - 1].toLowerCase()
                            if (selectedTags.includes("all")) {
                                return true
                            }

                            const tagObjects = attachmentConstants.ATTACHMENT_TAGS.filter(it => selectedTags.includes(it.key))
                            let filterResult = false;
                            for (let tagObject of tagObjects) {
                                if (tagObject.allowExtension.includes(fileExtension)) {
                                    filterResult = true
                                }
                            }
                            return filterResult
                        }).map((item) => {
                            return (
                                <Card
                                    key={item.key}
                                    hoverable
                                    style={{
                                        backgroundColor: selectedFileIds.includes(item.key) ? "#CCFF99" : "white"
                                    }}
                                    onClick={() => dispatch.attachModel.handleSelectFile(item.key)}
                                >
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 10,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>

                                        <Image
                                            src={item.attDir}
                                            width={100}
                                            fallback="data:image/png;base64,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"
                                            placeholder={
                                                <Image
                                                    preview={false}
                                                    src={item.attDir + "?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"}
                                                    width={100}
                                                />
                                            }
                                        />
                                        <div>
                                            <Tooltip title={item.filename}>
                                                <Typography.Text style={{ width: 100 }}
                                                    ellipsis={{ suffix: item.filename.slice(-5).trim() }}
                                                >{item.filename}</Typography.Text>
                                            </Tooltip>

                                        </div>
                                    </div>
                                </Card>
                            )
                        })
                    }

                </div>
            </Spin>


            <ModalForm
                loading={uploadLoading}
                title='上传附件'
                width="30%"
                open={uploadFileModalOpen}
                onOpenChange={dispatch.attachModel.handleUploadFileModalOpen}
                onFinish={async (values: any) => {
                    dispatch.attachModel.uploadAttachment(null)
                }}

            >
                <Upload
                    multiple
                    onChange={handleUploadChange}
                    beforeUpload={() => {
                        return false;
                    }}
                    onRemove={(file) => {
                        const index = uploadList.indexOf(file);
                        const newFileList = uploadList.slice();
                        newFileList.splice(index, 1);
                        dispatch.attachModel.setUploadFileList(newFileList);
                    }}
                    fileList={uploadList}
                >
                    <Button>上传</Button>
                </Upload>
                <hr />
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    value={selectedCategory}
                    onChange={(value: string[]) => dispatch.attachModel.batchSetSelectedCategory(value)}
                    filterOption={(input, option) => {
                        return option?.label.includes(input) ? true : false;
                    }}
                    options={categoryList.map(item => {
                        return {
                            label: item.label,
                            value: item.key
                        }
                    })}
                />
            </ModalForm>

        </div>
    )
}
