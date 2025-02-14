import React, { useEffect, useState } from 'react'
import { Flex, Tag, Select, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ModalForm, ProFormText, ProForm } from '@ant-design/pro-components';
import { Dispatch, RootState } from '@/store';
import Button2 from '@/components/button/Button2';
import { addCategory, getCategoryList } from '@/services/ceap/systemCategoryController';
import { attachmentConstants } from '@/constants/common';
import { CategoryListType } from '@/models/attachment';

export default function AttachmentGroup() {
  const dispatch = useDispatch<Dispatch>()
  const selectedCategory = useSelector((state: RootState) => state.attachModel.selectedCategory)
  const categoryList = useSelector((state: RootState) => state.attachModel.categoryList)
  const [addTagModalOpen, handleAddTagModalOpen] = useState(false)

  const handleChange = (tag: string, checked: boolean) => {
    
    dispatch.attachModel.handleCategoryChange({tag, checked})
    
  };
  const handleSelectChange = (value: string[]) => {
    dispatch.attachModel.batchSetSelectedCategory(value)
  }

  useEffect(() => {
    getCategorys()
  }, [])

  const getCategorys = async () => {
      const resp = await getCategoryList({
        categoryType: 2,
        categoryName: ""
      })
      const nextCategorys: CategoryListType[] = resp.data?.map((item) => {
        return {
          key: String(item.id),
          label: item.name || ""
        }
      }) || []
      dispatch.attachModel.setCategoryList([...attachmentConstants.DEFAULT_CATEGORY_TAGS, ...nextCategorys])
  }
  return (
    <div>
      <div style={{
        marginBottom: "1rem"
      }}>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
          value={selectedCategory}
          onChange={handleSelectChange}
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
      </div>
      <div style={{
        marginTop: "1rem",
        marginBottom: "1rem"
      }}>
        <Button2 buttonText='添加标签' onClick={() => handleAddTagModalOpen(true)} />
      </div>

      <Flex gap={4} wrap align="center">
        {categoryList.map((tag) => {
          return (
            <Tag.CheckableTag
              key={tag.key}
              checked={selectedCategory.includes(tag.key)}
              onChange={(checked) => handleChange(tag.key, checked)}
            >
              {tag.label}
            </Tag.CheckableTag>
          )
        })}
      </Flex>

      <ModalForm
        title='添加附件标签'
        width="30%"
        open={addTagModalOpen}
        onOpenChange={handleAddTagModalOpen}
        onFinish={async (values: any) => {
          console.log("values")
          const resp = await addCategory({
            categoryName: values.tagName,
            categoryType: 2
          })
          if (resp.code === 200){
            message.success(resp.msg)
          }
          getCategorys()
          handleAddTagModalOpen(false)
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
                name="tagName"
                label="标签名称"
                tooltip=""
                rules={[
                  {
                    required: true,
                    message: '为必填项',
                  },
                ]}
                placeholder="请输入标签名称"
              ></ProFormText>
            </ProForm.Group>
          </div>
        </div>

      </ModalForm>

    </div>
  )
}
