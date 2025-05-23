

export const commonConstants = {
    DEFAULT_AVATAR: "https://pic1.imgdb.cn/item/66f584d4f21886ccc033d91a.png",
    PAGE_LOGO: "https://pic1.imgdb.cn/item/67a0c87ad0e0a243d4f9bf3f.png",
    LOGIN_LOGO: "https://pic1.imgdb.cn/item/67a0c898d0e0a243d4f9bf4e.png",
    ACCESS_COUNT_ICON: "https://pic1.imgdb.cn/item/67a0d8fdd0e0a243d4f9dac2.png",
};

export const attachmentConstants = {
    ATTACHMENT_TAGS: [
        {
            key: 'all',
            label: '全部',
            allowExtension: ["*"]
        },
        {
            key: 'image',
            label: '图片',
            allowExtension: ["png", "jpg", "jpeg", "webp"]
        },
        {
            key: 'video',
            label: '视频',
            allowExtension: ["mp4"]
        },
        {
            key: 'ppt',
            label: 'PPT',
            allowExtension: ["ppt"]
        },
        {
            key: 'document',
            label: '文档',
            allowExtension: ["pdf", "txt", "md"]
        },
        {
            key: 'audio',
            label: '音频',
            allowExtension: ["mp3"]
        },
      
    ],
    DEFAULT_CATEGORY_TAGS: [
        {
            key: 'all',
            label: '全部'
        },
    ]
}
