import Home from "@/pages/Home";
import ThreadShow from "@/pages/ThreadShow";
import {createRouter, createWebHistory} from "vue-router";
import NotFound from "@/pages/NotFound";
import Forum from "@/pages/Forum";
import Category from "@/pages/Category";
import Profile from "@/pages/Profile";
import ThreadCreate from "@/pages/ThreadCreate";
import ThreadEdit from "@/pages/ThreadEdit";
import store from '@/store'
const routes = [
    {
        path : '/',
        name : 'Home',
        component : Home
    },
    {
        path : '/me',
        name : 'Profile',
        component : Profile,
        meta:{top:true,smoothScroll:true}
    },
    {
        path : '/me/edit',
        name : 'ProfileEdit',
        component : Profile,
        props: {edit: true}
    },
    {
        path : '/category/:id',
        name : 'Category',
        component : Category,
        props: true
    },
    {
        path : '/forum/:id',
        name : 'Forum',
        component : Forum,
        props: true
    },
    {
        path : '/thread/:threadId/edit',
        name : 'ThreadEdit',
        component : ThreadEdit,
        props: true,
    },
    {
        path : '/thread/:id',
        name : 'ThreadShow',
        component : ThreadShow,
        props: true,
        // beforeEnter(to, from, next){
        //     const threadExists = sourceData.threads.find(thread => thread.id === to.params.id)
        //     if(threadExists){
        //         return next()
        //     }else {
        //         next({
        //             name:'NotFound',
        //             params: {pathMatch : to.path.substring(1).split('/')},
        //             query:to.query,
        //             hash:to.hash
        //         })
        //     }
        // }
    },
    {
        path : '/forum/:forumId/thread/create',
        name : 'ThreadCreate',
        component : ThreadCreate,
        props: true,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },

]

const router =   createRouter({
    history:createWebHistory(),
    routes,
    scrollBehavior(to)
    {
        const scroll = {}

        if(to.meta.top) scroll.top = 0

        if(to.meta.smoothScroll) scroll.behavior = 'smooth'

        return scroll;
    }
});

router.beforeEach(() => {
    store.dispatch('unsubscribeAllSnapshots')
})

export default router