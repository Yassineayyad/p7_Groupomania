import { createRouter, createWebHistory } from 'vue-router';
import login from '@/views/login.vue';
import home from '@/views/home.vue';
import profil from '@/views/profil.vue';
import onepost from '@/views/onepost.vue';
import userprofil from "@/views/userprofil.vue";
import comment from "@/views/comment.vue";

const routes = [
  {
    name: "login",
    path: "/",
    component: login,
    meta: {
      title: "Connexion",
    },
  },
  {
    name: "home",
    path: "/home",
    component: home,
    meta: {
      title: "page d'acceuil",
    },
  },
  {
    name: "profil",
    path: "/profil",
    component: profil,
    meta: {
      title: "Votre profile",
    },
  },
  {
    name: "onepost",
    path: "/:id",
    component: onepost,
    meta: {
      title: "groupomania",
    },
  },
  {
    name: "userprofil",
    path: "/:id",
    component: userprofil,
    meta: {
      title: "profile groupomania",
    },
  },
  {
    name: "comment",
    path: "/comment/:id",
    component: comment,
    meta: {
      title: " ajoutez un commentaire",
    },
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