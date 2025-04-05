
import { View, Image, Text } from "@tarojs/components"
import { IMAGE_MAP } from "../../constant/global"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, RootState } from "../../store"
import { login } from "@tarojs/taro"
import { AtToast } from "taro-ui"

const orders = [
  {
    label: "待付款",
    icon: IMAGE_MAP.unlogin_avatar
  },
  {
    label: "待发货",
    icon: IMAGE_MAP.unlogin_avatar
  },
  {
    label: "待评价",
    icon: IMAGE_MAP.unlogin_avatar
  },
  {
    label: "退换/售后",
    icon: IMAGE_MAP.unlogin_avatar
  },
  {
    label: "地址管理",
    icon: IMAGE_MAP.unlogin_avatar
  },
]
export default function UserPage() {
  const dispatch = useDispatch<Dispatch>()
  const isAuth = useSelector((state: RootState) => state.authModel.isAuth)
  const authLoading = useSelector((state: RootState) => state.authModel.authLoading)
  const userInfo = useSelector((state: RootState) => state.authModel.userInfo)
  const userLogin = () => {
    login({
      success: (res: any) => {
        if (res.code) {
          dispatch.authModel.userLogin(res.code)
        }

      }
    })
  }
  return (
    <>
       <View className={
      `h-screen bg-[var(--secondColor)] flex flex-col items-center w-full pt-3 gap-4`
    } >
      {
        isAuth ? (
          <View className="border border-white rounded-2xl py-4 px-3 w-[90%] bg-white flex gap-4 items-center"
          >
            <View>
              <Image src={userInfo.avatar ? userInfo.avatar: IMAGE_MAP.default_avatar} mode="scaleToFill" className="h-10 w-10" />
            </View>
            <View>{userInfo.nickname}</View>
          </View>
        ): (
          <View className="border border-white rounded-2xl py-4 px-3 w-[90%] bg-white flex gap-4 items-center"
          onClick={userLogin}
        >
          <View>
            <Image src={IMAGE_MAP.unlogin_avatar} mode="scaleToFill" className="h-10 w-10" />
          </View>
          <View>登录/注册</View>
        </View>
        )
      }
    

      <View className="border border-white rounded-2xl bg-white w-[90%] py-3 px-4 flex flex-col">
        <Text className="font-bold">我的订单</Text>
        <View className="flex justify-center">
          <View className="border-b h-1 border-[#eeeeee] mt-2 w-full"></View>
        </View>

        <View className="grid grid-flow-col gap-4 mt-5">
          {
            orders.map((it, index) => (
              <View key={index}
                className="flex flex-col gap-2 items-center justify-center"
              >
                <Image src={it.icon} className="h-8 w-8"></Image>
                <Text className="text-sm">{it.label}</Text>
              </View>
            ))
          }
        </View>
      </View>
      <View className="border border-white rounded-2xl bg-white w-[90%] py-3 px-4 flex flex-col">
        <Text className="font-bold">我的健康服务</Text>
        <View className="flex justify-center">
          <View className="border-b h-1 border-[#eeeeee] mt-2 w-full"></View>
        </View>

        <View className="grid grid-cols-4 gap-4 mt-5">
          {
            orders.map((it, index) => (
              <View key={index}
                className="flex flex-col gap-2 items-center justify-center"
              >
                <Image src={it.icon} className="h-8 w-8"></Image>
                <Text className="text-sm">{it.label}</Text>
              </View>
            ))
          }
        </View>
      </View>


    </View>
    <AtToast isOpened={authLoading} duration={0} status="loading" text="登录中"/>

    </>
 
  )
}