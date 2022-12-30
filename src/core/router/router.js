import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            redirect: "/dashboard",
            component: () => import("@/view/layout/Layout"),
            children: [
               
                {
                    path: "/dashboard",
                    name: "dashboard",
                    component: () => import("@/view/components/Dashboard.vue"),

                },
                {
                    path: "/createUsuario",
                    name: "createUsuario",
                    component: () => import("@/view/components/createUsuarios.vue")
                },
             
                {
                    path: "/listaUsuario",
                    name: "listaUsuario",
                    component: () => import("@/view/components/listaUsuarios.vue"),

                },
           

            ]
            

        },
        {
            path: "/",
            component: () => import("@/view/pages/auth/Login"),
            children: [
                {
                    name: "login",
                    path: "/login",
                    component: () => import("@/view/pages/auth/Login")
                },
                {
                    name: "register",
                    path: "/register",
                    component: () =>
                        import("@/view/pages/auth/Login")
                },

            ]
        },
   
    ]
});