import axios, {AxiosRequestConfig} from "axios";
import {userTokenKey, baseURL} from "./globalConst";
import {showErrorMsg} from "@/utils/globalFunc.ts";




export interface TransDef {
    code: number
    data: object
    msg: string
}


const myAxios = axios.create({baseURL});

// 请求拦截器
myAxios.interceptors.request.use(config => {
    const token = localStorage.getItem(userTokenKey);
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
});
myAxios.interceptors.response.use(
    response => {
        // 解包
        return response?.data || {}
    },
    (error = {}) => {
        const {response = {}} = error || {};

        // 加号将后面的内容转换为数字，`?.`是可选链操作符，为空则表达式结果为undefined而非报错
        switch (+response?.status) {
            case 401: // 鉴权失败时执行此逻辑
            {
                const msg = response?.data?.msg || "鉴权失败"
                console.log("鉴权失败")
                showErrorMsg(msg)

                // 退出登陆状态
                // useUserStore().logout()
                break;
            }
            case 403: // 权限不够时执行此逻辑
            {
                const msg = response?.data?.msg || "权限不足"
                console.log("权限不足")
                showErrorMsg(msg)
                break;
            }
            case 400: {
                const msg = response?.data?.msg || "请求有误"
                console.log("请求有误")
                showErrorMsg(msg)
                break;
            }
            default: // 未知错误
            {
                console.log(error)
                console.log(response)
                const msg = response?.data?.msg || "网络错误，后端未部署或您未接入互联网"
                showErrorMsg(msg)
                break
            }


        }
        return Promise.reject(response?.data || {});
    }
)

export function request<T, R>(config: AxiosRequestConfig<T>): Promise<R> {
    return myAxios(config) as unknown as Promise<R>;
}