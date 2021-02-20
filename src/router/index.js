import PageHome from "@/components/PageHome";
import PageThreadShow from "@/components/PageThreadShow";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path : '/',
        name : 'Home',
        component : PageHome
    },
    {
        path : '/thread/:id',
        name : 'PageThreadShow',
        component : PageThreadShow,
        props: true
    }
]

export default  createRouter({
    history:createWebHistory(),
    routes
});