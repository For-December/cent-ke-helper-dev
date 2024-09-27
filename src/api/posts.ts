import {request, TransDef} from "@/api/myAxois.ts";
import {apiPrefix} from "@/api/globalConst.ts";

export const webGetPosts = ()
    : Promise<TransDef> => {
    return request({
        method: 'get',
        url: apiPrefix + '/posts',
    })
};