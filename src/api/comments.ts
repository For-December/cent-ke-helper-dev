import {request, TransDef} from "@/api/myAxois.ts";
import {apiPrefix} from "@/api/globalConst.ts";

export const webGetComments = (
    page: number,
    pageSize: number,
    id: number)
    : Promise<TransDef> => {

    return request({
        method: "get",
        url: apiPrefix + "/posts/" + id + "/comments",
        params: {
            page,
            pageSize
        }
    });
};

export const webCreateComment = (id: number, content: string)
    : Promise<TransDef> => {
    return request({
        method: "post",
        url: apiPrefix + "/posts/" + id + "/comments",
        data: {
            content
        }
    });
};

export const webDeleteComment = (id: number)
    : Promise<TransDef> => {
    return request({
        method: 'delete',
        url: apiPrefix + '/comments/' + id,
    })
};



