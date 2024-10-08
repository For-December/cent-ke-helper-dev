import {RouteRecordRaw} from "vue-router";


export const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/view/HelperPage.vue'),
        meta: {hidden: true}
    },
    {
        path: '/tree-hole',
        component: () => import('@/view/mobile/Index.vue'),
        meta: {hidden: true}
    },
    {
        path: '/test',
        component: () => import('@/view/Test.vue'),
        meta: {hidden: true}
    }
]

export default routes;
