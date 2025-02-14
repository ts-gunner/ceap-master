import { Models } from "@rematch/core"
import { globalModel } from "./global"
import { attachModel } from "./attachment"
export interface RootModel extends Models<RootModel>{
    globalModel: typeof globalModel,
    attachModel: typeof attachModel,
}


export const models: RootModel = {
    globalModel,
    attachModel
}