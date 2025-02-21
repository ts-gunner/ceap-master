import { createModel } from "@rematch/core";
import type { RootModel } from '@/models'
import { message, type UploadFile } from 'antd';
import { uploadAttachmentFile,getUploadedAttachmentList } from "@/services/ceap/systemAttachmentController";

export type CategoryListType = {
    key: string, 
    label: string
}

export type AttachmentListType = {
    key: number,
    filename: string,
    attDir: string,
    attSize: string,
    attType: string,
    uploader: string,
}
type AttachmentType = {
    selectedTags: string[]  // 选中的图片类型标签
    uploadList: UploadFile[]
    selectedCategory: string[]  // 选中的标签
    selectedFileIds: number[]
    categoryList: CategoryListType[]
    uploadFileModalOpen: boolean
    uploadLoading: boolean
    attachmentList: AttachmentListType[]
    attachmentLoading: boolean
    selectedExtensionAllowList: string[]  // 选择图片允许的文件格式
    selectedLimit: number // 选择图片的上限
}

const initState: AttachmentType = {
    selectedTags: ["all"],
    uploadList: [],
    selectedCategory: [],
    categoryList: [],
    uploadFileModalOpen: false,
    uploadLoading: false,
    attachmentList: [],
    attachmentLoading: false,
    selectedFileIds: [],
    selectedExtensionAllowList: [],
    selectedLimit: 10
}

export const attachModel = createModel<RootModel>()({
    state: initState,
    reducers: {
        setSelectedTags: (state: AttachmentType, payload: { tag: string, checked: boolean }) => {
            if (payload.tag === "all" && payload.checked) {
                return {
                    ...state,
                    selectedTags: ["all"]
                }
            } else {
                let nextSelectedTags = payload.checked
                    ? [...state.selectedTags, payload.tag]
                    : state.selectedTags.filter((t) => t !== payload.tag);
                if (nextSelectedTags.filter(t => t !== "all").length > 0) {
                    nextSelectedTags = nextSelectedTags.filter(t => t !== "all")
                }
                return {
                    ...state,
                    selectedTags: nextSelectedTags
                }
            }

        },
        setUploadFileList: (state:AttachmentType, payload: UploadFile[]) => {
            return {
                ...state,
                uploadList: payload
            }
        },
        setAttachmentLoading: (state:AttachmentType, payload: boolean) => {
            return {
                ...state,
                attachmentLoading: payload
            }
        },
        setSelectedCategory: (state: AttachmentType, payload: { tag: string, checked: boolean }) => {
            if (payload.tag === "all" && payload.checked) {
                return {
                    ...state,
                    selectedCategory: ["all"]
                }
            } else {
                let nextSelectedCategory = payload.checked
                    ? [...state.selectedCategory, payload.tag]
                    : state.selectedTags.filter((t) => t !== payload.tag);
                if (nextSelectedCategory.filter(t => t !== "all").length > 0) {
                    nextSelectedCategory = nextSelectedCategory.filter(t => t !== "all")
                }
                return {
                    ...state,
                    selectedCategory: nextSelectedCategory
                }
            }
        },
        batchSetSelectedCategory: (state: AttachmentType, payload: string[]) => {
            if (payload.includes("all")) {
                return {
                    ...state,
                    selectedCategory: ["all"]
                }
            }
            return {
                ...state,
                selectedCategory: payload
            }
        },
        setCategoryList: (state: AttachmentType, payload: CategoryListType[]) => {
            return {
                ...state,
                categoryList: payload
            }
        },
        handleUploadFileModalOpen: (state: AttachmentType, payload: boolean) => {
            return {
                ...state,
                uploadFileModalOpen: payload
            }
        },
        setAttachmentList: (state: AttachmentType, payload: AttachmentListType[]) => {
            return {
                ...state,
                attachmentList: payload
            }
        },
        setSelectedFileIds: (state: AttachmentType, payload: number[]) => {
            return {
                ...state,
                selectedFileIds: payload
            }
        },
        clearSelectedFile: (state:AttachmentType) => {
            return {
                ...state,
                selectedFileIds: []
            }
        },
        // 选择图片允许的文件格式
        setSelectedExtensionAllowList: (state:AttachmentType, payload: string[]) => {
            return {
                ...state,
                selectedExtensionAllowList: []
            }
        },
        setSelectedLimit: (state:AttachmentType, payload: number) => {
            return {
                ...state,
                selectedLimit: payload
            }
        },
        initSelectedLimit: (state:AttachmentType) => {
            return {
                ...state,
                selectedLimit: initState.selectedLimit
            }
        },
        initialize: () => {
            return initState
        },
        setUploadLoading: (state:AttachmentType, payload: boolean) => {
            return {
                ...state,
                uploadLoading: payload
            }
        },
    },
    effects: (dispatch) => ({
        uploadAttachment: async (_, state) => {
            dispatch.attachModel.setUploadLoading(true)
            for (let file of state.attachModel.uploadList){
                const resp = await uploadAttachmentFile({
                    categoryIds: state.attachModel.selectedCategory.join(",")
                }, {}, file.originFileObj)
                if (resp.code !== 200){
                    message.error(file.name + "上传失败: " + resp.msg)
                    return
                }
            }
            message.success("附件上传成功！！")
            dispatch.attachModel.setUploadLoading(false)

            dispatch.attachModel.getAttachmentList(null)
            dispatch.attachModel.handleUploadFileModalOpen(false)

        },
        getAttachmentList: async (_, state) => {
            dispatch.attachModel.setAttachmentLoading(true)
            let categroyIds;
            if (state.attachModel.selectedCategory.includes("all")){
                categroyIds = ""
            }else {
                categroyIds = state.attachModel.selectedCategory.join(",")
            }
            const resp = await getUploadedAttachmentList({
                categoryIds: categroyIds
            })
            const nextAttachmentList: AttachmentListType[] = resp.data?.map((item) => {
                return {
                    key: item.id || -1,
                    filename: item.attName || "",
                    attDir: item.attDir || "",
                    attSize: item.attSize || "",
                    attType: item.attType || "",
                    uploader: item.uploader || "",
                }
            }) || []
            dispatch.attachModel.setAttachmentList(nextAttachmentList)
            dispatch.attachModel.setAttachmentLoading(false)
       },

       handleCategoryChange: async (payload: {tag: string, checked: boolean}) => {
            dispatch.attachModel.setSelectedCategory(payload)
            dispatch.attachModel.getAttachmentList(null)
       },
       handleSelectFile: (payload: number, state) => {
            if (state.attachModel.selectedFileIds.includes(payload)) {
                // 已经选中，且再点击，则取消
                dispatch.attachModel.setSelectedFileIds(
                    state.attachModel.selectedFileIds.filter(it => it != payload)
                )
            }else {

                const nextFileIds = [
                    ...state.attachModel.selectedFileIds, payload
                ]
                if (nextFileIds.length > state.attachModel.selectedLimit){
                    message.error("最多只能选择"+ state.attachModel.selectedLimit + "个附件")
                    return
                }
                dispatch.attachModel.setSelectedFileIds(nextFileIds)
            }
       }
    })
})