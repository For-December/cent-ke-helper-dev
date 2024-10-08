import {request, TransDef} from "@/api/myAxois.ts";
import {apiPrefix} from "@/api/globalConst.ts";

export const webUpdateStar = (id: number, isStar: boolean)
    : Promise<TransDef> => {
    return request({
        method: "post",
        url: apiPrefix + "/posts/" + id + "/stars",
        data: {
            isStar
        }
    });
};

export const webGetProfileStars = ()
    : Promise<TransDef> => {
    return request({
        method: "get",
        url: apiPrefix + "/profile/stars"
    });
};