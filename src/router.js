import { createRouter, createWebHistory } from "vue-router";
import Task from "./views/Task.vue";
import New from "./views/New.vue";
import Tasks from "./views/Tasks.vue";
import NotFound from "./views/NotFound.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/tasks', alias: '/', component: Tasks},
        {path: '/task/:taskId', component: Task, props: true},
        {path: '/new', component: New},
        {path: '/:notFound(.*)*', component: NotFound, props: true}
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})