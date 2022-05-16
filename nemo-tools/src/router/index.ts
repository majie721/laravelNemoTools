import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '@/layout/Index.vue'
import JsonModel from '@/layout/JsonModel.vue'
import DbModel from '@/layout/DbModel.vue'



const routes:Array<RouteRecordRaw> = [
    {
       path:'/',
       redirect:'/home'
    },
    {
        path:'/home',
        component:Home,
    },
    {
        path:'/json_model',
        component:JsonModel,
    },
    {
        path:'/db_model',
        component:DbModel,
    }


]

const router = createRouter({
    history:createWebHashHistory(),
    routes:routes
})

export default router