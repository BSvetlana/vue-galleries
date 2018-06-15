import Vue from "vue";
import VueRouter from "vue-router";
import { requiresAuth, guestOnly } from "./guards";

Vue.use(VueRouter);

import AllGalleries from "../pages/AllGalleries.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import SingleGalleryPage from "../pages/SingleGalleryPage.vue"

const routes = [
  {
    path: "/",
    redirect: "/galleries",
    name: "home"
  },
  {
    path: "/galleries",
    component: AllGalleries,
    name: "all-galleries",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    component: Login,
    name: "login-gallery",
    meta: {
      guestOnly: true
    }
  },
  {
    path: "/register",
    component: Register,
    name: "register-gallery",
    meta: {
      guestOnly: true
    }
  },
  {
    path: "/galleries/:id",
    component: SingleGalleryPage,
    name: 'single-gallery',
    meta: {
      requiresAuth: true
    }
  }
];

export const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  Promise.resolve(to)
      .then(requiresAuth)
      .then(guestOnly)
    .then(() => {
      next();
    })
    .catch(redirect => {
      next(redirect);
    });
});
