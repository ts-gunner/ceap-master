

export const MESSAGE_LIST: {
    role: string, 
    message?:string,
    messages?: string[]
}[] = [
    {
        role: "system",
        message: `
用户您好，我是AI旅游助手-小文。你想去南京附近游玩，我将为你制定游玩计划。
        `
    },
    {
        role: "assistant",
        messages: [
            "有没有推荐的景点",
            "旅游注意事项",
        ]
    },
    {
        role: "user",
        message: "有没有什么景点推荐一下？"
    },

    {
        role: "system",
        message: `
可以的，这边推荐几个地方，比如：夫子庙，以下是他相关的照片。
$IMAGE:https://forty-bucket-1305170185.cos.ap-guangzhou.myqcloud.com/static/fzm1.jpg$
$IMAGE:https://forty-bucket-1305170185.cos.ap-guangzhou.myqcloud.com/static/fzm2.jpg$
南京夫子庙，古韵悠长，秦淮河畔的文化地标。庙宇庄严，古木参天，集儒学、市井、美食于一体，游人如织，繁华与静谧交织。

牛首山，以下是他相关的照片。
$IMAGE:https://forty-bucket-1305170185.cos.ap-guangzhou.myqcloud.com/static/nss1.jpg$
$IMAGE:https://forty-bucket-1305170185.cos.ap-guangzhou.myqcloud.com/static/nss2.jpg$
$IMAGE:https://forty-bucket-1305170185.cos.ap-guangzhou.myqcloud.com/static/nss3.jpg$
牛首山，是一座历史悠久、风景秀丽的佛教名山。山势雄伟，形似卧牛，因而得名。山上有著名的佛顶宫，供奉着释迦牟尼佛顶骨舍利，是佛教信徒心中的圣地。牛首山不仅佛教文化底蕴深厚，而且自然景观也十分迷人，四季分明，春有百花争艳，夏有绿荫蔽日，秋有红叶满山，冬有雪景如画。登高望远，可以俯瞰南京城的美丽风光，是游客朝圣、观光、休闲的理想之地。
        `
    },
    {
        role: "assistant",
        messages: [
            "出发的城市",
            "有没有什么美食",
            "说说您的预算范围",
            "您是否有任何的饮食限制或者健康问题",
            "您是否有任何特别的需求或者偏好?"
        ]
    },
    {
        role: "user",
        message: "有没有什么美食？"
    },
    {
        role: "system",
        message: `
南京的特色菜式有
1. 鸭血粉丝汤，是南京街头巷尾常见的小吃，深受当地人喜爱。它以鸭血、鸭肠、鸭肝等鸭杂为主料，配以粉丝、豆腐泡等，汤头鲜美，口感丰富。
$IMAGE:https://forty-bucket-1305170185.cos.ap-guangzhou.myqcloud.com/static/yxfs.jpg$
2. 蟹黄汤包，是南京的传统点心，皮薄馅多，汤汁丰富，口感鲜美。与上海小笼包相比，金陵小笼包的皮稍厚，汤汁更为浓郁。
$IMAGE:https://forty-bucket-1305170185.cos.ap-guangzhou.myqcloud.com/static/xhtb.jpg$
3. 全蟹宴
$IMAGE:https://forty-bucket-1305170185.cos.ap-guangzhou.myqcloud.com/static/28b5d620-7357-49be-b6c5-94c8dae7dccc.png$

        `
    },
    {
        role: "system",
        message: "你打算什么时候出发呢？乘坐飞机还是火车还是高铁呢"
    },
    {
        role: "user",
        message: "我打算3月20日坐火车出发"
    },
    {
        role: "system",
        message: `
好的，我从【同程旅行】小程序中找到以下行程。
$MINIPRO:#小程序://同程旅行/G8XFeBPeBIoKmzC$
        `
    }
]