import { Models } from "@rematch/core"
import { globalModel } from "./global"
import { attachModel } from "./attachment"
import { productModel } from "./product"

export interface RootModel extends Models<RootModel>{
    globalModel: typeof globalModel,
    attachModel: typeof attachModel,
    productModel: typeof productModel,
}


export const models: RootModel = {
    globalModel,
    attachModel,
    productModel,
}