import { createModel } from "@rematch/core";
import type { RootModel } from '@/models'
import { getProductTabBadge } from "@/services/ceap/storeProductController";

// 0: 出售中商品， 1： 仓库商品 2：售罄商品 3：商品回收站

type StoreProductType = {
    tabBadge: {
        0: number,
        1: number,
        2: number,
        3: number
    }
}

const initState: StoreProductType = {
    tabBadge: {
        0: 0,
        1: 0,
        2: 0,
        3: 0
    }
}
// 商品模型
export const productModel = createModel<RootModel>()({
    state: initState,
    reducers: {
        setTabBadge: (state: StoreProductType, payload: {
            0: number,
            1: number,
            2: number,
            3: number
        }) => {
            return {
                ...state,
                tabBadge: payload
            }
        }

    },
    effects: (dispatch) => ({
        refreshTabBadge: async () => {
            const resp = await getProductTabBadge();
            const data = resp.data as {
                0: number,
                1: number,
                2: number,
                3: number
            }
            dispatch.productModel.setTabBadge(data)
        }
    })
})