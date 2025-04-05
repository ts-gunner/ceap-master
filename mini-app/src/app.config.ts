import { themeStyle } from "./constant/theme"
export default defineAppConfig({
  tabBar: {
    color: themeStyle["--textColor"],
    selectedColor: themeStyle["--strongColor"],
    backgroundColor: themeStyle["--secondColor"],
    list: [
      {
        pagePath: "pages/home/index",
        iconPath: "static/mine.png",
        selectedIconPath: "static/mine-active.png",
        text: "我的"
      },

      {
        pagePath: "pages/user/index",
        iconPath: "static/mine.png",
        selectedIconPath: "static/mine-active.png",
        text: "用户中心"
      }
    ]
  },
  entryPagePath: "pages/user/index",
  pages: [
    'pages/home/index', "pages/user/index"
  ],
  window: {
    navigationBarTitleText: '安健社区服务',
    navigationBarBackgroundColor: "#FFFFFF",
    navigationBarTextStyle: 'black',
  },
  lazyCodeLoading: "requiredComponents",
  requiredBackgroundModes: []
})
