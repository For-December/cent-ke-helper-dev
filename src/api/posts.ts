import {request} from "@/api/myAxois.ts";
import {apiPrefix} from "@/api/globalConst.ts";

export const webGetPosts = ()
    : Promise<PostRecord[]> => {
    return request({
        method: 'get',
        url: apiPrefix + '/posts',
    })
};