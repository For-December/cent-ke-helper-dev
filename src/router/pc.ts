import {RouteRecordRaw} from "vue-router";


export const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/view/CoursePage.vue'),
        meta: {hidden: true}
    }
]

export default routes;
