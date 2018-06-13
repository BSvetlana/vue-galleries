import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import AllGalleries from '../pages/AllGalleries.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

const routes = [
    {path: '/', redirect: '/galleries', name: 'home'},
    {path: '/galleries', component: AllGalleries, name: 'all-galleries'},
    {path: '/login', component: Login, name: 'login'},
    {path: '/register', component: Register, name: 'register'}
]

export const router = new VueRouter({
    mode: 'history',
    routes
})