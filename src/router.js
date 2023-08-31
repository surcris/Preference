import { createWebHistory, createRouter } from "vue-router";
//! la ƒ° createWebHistory
//* très commun dans les app SPA (web-mobile-etc...)
//* Permet de créer un historique de navigation (VUE sait tjrs d'ou vous venez)
//* Exemple  : les boutons précèdent dans les app Mobile
// ! la ƒ° createRouter 
//* permet à VUE d'instancier une nouvelle instance router
const routes = [
    {
        path: "/",
        alias: "/accueil",
        name: "accueil",
        component: () => import("./components/Home.vue"),

    },
    {
        path: "/authentification",
        name: "authentification",
        component: () => import("./components/Authentification.vue"),


    },
    {

        path: "/profil",
        name: "profil",
        component: () => import("./components/ProfilComponent.vue"),
        props: true

    },
    {

        path: "/eclipse",
        name: "eclipse",
        component: () => import("./components/eclipseHome.vue"),
        props: true

    },
    {
        name: 'NotFound',
        path: '/:pathMatch(.*)',
        component: () => import("./components/NotFound.vue")
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;