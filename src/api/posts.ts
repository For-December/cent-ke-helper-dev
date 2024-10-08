import {request, TransDef} from "@/api/myAxois.ts";
import {apiPrefix} from "@/api/globalConst.ts";
import {CreatePostParam} from "@/types/treeHole.ts";

export const webGetPosts = (
    page: number,
    pageSize: number,
    searchValue: string = "")
    : Promise<TransDef> => {
    return request({
        method: 'get',
        url: apiPrefix + '/posts',
        params: {
            page,
            pageSize,
            searchValue
        }
    })
};

export const webCreatePost = (data: CreatePostParam)
    : Promise<TransDef> => {
    console.log(data)
    const formData = new FormData();
    formData.append('authorId', data.authorId.toString());
    formData.append('authorName', data.authorName)
    formData.append('text', data.text)
    data.images.forEach(image => formData.append('images', image));
    console.log(formData)
    return request({
        method: "post",
        url: apiPrefix + "/posts",
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData,
    });
};

export const webDeletePost = (id: number)
    : Promise<TransDef> => {
    return request({
        method: 'delete',
        url: apiPrefix + '/posts/' + id,
    })
};
