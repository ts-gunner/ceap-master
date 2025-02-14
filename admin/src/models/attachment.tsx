import { createModel } from "@rematch/core";
import type { RootModel } from '@/models'
import { message, type UploadFile } from 'antd';
import { uploadAttachmentFile,getUploadedAttachmentList } from "@/services/ceap/systemAttachmentController";

export type CategoryListType = {
    key: string, 
    label: string
}

export type AttachmentListType = {
    filename: string,
    attDir: string,
    attSize: string,
    attType: string,
    uploader: string,
}
type AttachmentType = {
    selectedTags: string[]
    uploadList: UploadFile[]
    selectedCategory: string[]
    categoryList: CategoryListType[]
    uploadFileModalOpen: boolean
    attachmentList: AttachmentListType[]
    attachmentLoading: boolean
}

const initState: AttachmentType = {
    selectedTags: ["all"],
    uploadList: [],
    selectedCategory: [],
    categoryList: [],
    uploadFileModalOpen: false,
    attachmentList: [],
    attachmentLoading: false
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

    },
    effects: (dispatch) => ({
        uploadAttachment: async (_, state) => {

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
       }
    })
})