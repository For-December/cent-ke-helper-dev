import {ref} from "vue";
import {Items} from "@/types/Items";
import {webGetTeachInfos} from "@/api/req.ts";
import {isApiError, teachInfosCacheKey} from "@/api/globalConst.ts";



// 学部 -> {教学楼->教室及详细信息}
export const globalTeachInfos =
    ref(new Map<string, Map<string, Items.TeachInfo[]>>())



