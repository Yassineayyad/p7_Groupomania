import { createRouter, createWebHistory } from 'vue-router';
import login from '@/views/login.vue';
import home from '@/views/home.vue';


const routes = [
    {
        name: 'login',
        path: '/',
        component : login,
        meta: {
            title: 'Connexion'
        }
    },
    {
        name: 'home',
        path: '/home',
        component: home,
        meta: {
            title: 'page d\'acceuil'
        }
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach((to, from)=>{
    console.log(from);
    document.title= to.meta.title;
});

export default router;