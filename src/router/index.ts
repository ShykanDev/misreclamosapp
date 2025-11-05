import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import LoginTabsPage from "../views/LoginTabsPage.vue";
import ContentTabs from "@/views/content/ContentTabs.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/initial",
  },
  {
    path: "/tabs/",
    component: LoginTabsPage,
    children: [
      //Array that contains the children tabs
      {
        // Default Redirection if route is ''
        path: "",
        redirect: "/tabs/login",
      },
      {
        //Tab that contains 2 properties path and component (Every ONE page should contain at least these 2 properties)
        path: "login",
        name: "login",
        component: () => import("@/views/LoginTab.vue"),
      },
      {
        path: "register",
        component: () => import("@/views/RegisterTab.vue"),
      },
      {
        path: "initial",
        component: () => import("@/views/InitialPage.vue"),
      },
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/content/HomeTab.vue"),
      },
      {
        path: "create",
        name: "Create",
        component: () => import("@/views/create/CreateComplaintTab.vue"),
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/profile/ProfilePage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
