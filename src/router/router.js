import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import AuthGuard from './auth-guard'
import homePage from '../components/Home.vue'
import shoppingPage from '../components/Shopping.vue'
import tradingPage from '../components/Trading.vue'
import buyersPage from '../components/Buyers.vue'
import loginPage from '../components/Auth/Login.vue'
import logoutPage from '../components/Auth/Logout.vue'
import registrationPage from '../components/Auth/Registration.vue'
import toolsPage from '../components/Admin/Tools.vue'
import adListPage from '../components/Admin/tools/adList.vue'
import newAdPage from '../components/Admin/tools/newAd.vue'
import adPage from '../components/Admin/tools/Ad.vue'
import accountPage from '../components/Auth/Account.vue'
import geoStructurePage from '../components/Admin/Tools/Geostructure.vue'
import usersPage from '../components/Admin/Tools/Users.vue'

Vue.use(VueRouter);
Vue.use(Vuelidate);

export default new VueRouter ({
    routes:[
        {
            path:'',
            component: homePage
        },

        {
            path:'/shopping',
            component: shoppingPage,
            beforeEnter: AuthGuard
        },
        {
            path:'/trading',
            component: tradingPage,
            beforeEnter: AuthGuard
        },
        {
            path:'/buyers',
            component: buyersPage,
            beforeEnter: AuthGuard
        },
        {
            path:'/login',
            component: loginPage
        },
        {
            path:'/logout',
            component: logoutPage,
            beforeEnter: AuthGuard
        },
        {
            path:'/registration',
            component: registrationPage
        },
        {
            path:'/tools',
            component: toolsPage,
            beforeEnter: AuthGuard
        },
        {
            path:'/adlist',
            component: adListPage,
            beforeEnter: AuthGuard
        },
        {
            path:'/newad',
            component: newAdPage,
            beforeEnter: AuthGuard
        },
        {
            path:'/ad/:id',
            props: true,
            component: adPage,
            beforeEnter: AuthGuard
        },
        {
            path:'/account',
            component: accountPage,
            beforeEnter: AuthGuard
        },
        {
            path:'/geostructure',
            component: geoStructurePage,
            beforeEnter: AuthGuard
        },
        {
            path:'/users',
            component: usersPage,
            beforeEnter: AuthGuard
        }


    ],
    mode: 'history'
})