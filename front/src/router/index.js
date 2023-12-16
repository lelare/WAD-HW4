import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import AddPost from "../views/AddPost.vue";
import Contact from "../views/Contact.vue";
import Terms from "../views/Terms.vue";
import Privacy from "../views/Privacy.vue";

import auth from "@/auth";

const routes = [
    // {
    //     path: "/",
    //     name: "home",
    //     component: HomeView,
    // },
    {
        path: "/",
        name: "home",
        component: HomeView,
        beforeEnter: async (to, from, next) => {
            let authResult = await auth.authenticated();
            if (!authResult) {
                next("/login");
            } else {
                next();
            }
        },
    },
    {
        path: "/signUp",
        name: "signUp",
        component: SignUp,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/addPost",
        name: "addPost",
        component: AddPost,
    },
    {
        path: "/contact",
        name: "contact",
        component: Contact,
    },
    {
        path: "/terms",
        name: "terms",
        component: Terms,
    },
    {
        path: "/privacy",
        name: "privacy",
        component: Privacy,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
