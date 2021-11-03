import { createRouter, createWebHistory } from 'vue-router';
import login from '@/views/login.vue';
import home from '@/views/home.vue';
import profil from '@/views/profil.vue';


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
    {
        name: 'profil',
        path: '/profil',
        component: profil,
        meta: {
            title: 'Votre profile'
        }
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach((to)=>{
    
    document.title= to.meta.title;
});

export default router;