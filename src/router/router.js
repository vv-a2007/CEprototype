import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import AuthGuard from './auth-guard'
import homePage from '../components/Home.vue'
import shoppingPage from '../components/Shopping.vue'
import tradingPage from '../components/Trading.vue'
import loginPage from '../components/Auth/Login.vue'
import logoutPage from '../components/Auth/Logout.vue'
import registrationPage from '../components/Auth/Registration.vue'
import toolsPage from '../components/Admin/Tools.vue'
import adListPage from '../components/Admin/tools/adList.vue'
import newAdPage from '../components/Admin/tools/newAd.vue'
import AdPage from '../components/Admin/tools/Ad.vue'
import AccountPage from '../components/Admin/tools/Account.vue'

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
            component: AdPage,
            beforeEnter: AuthGuard
        },
        {
            path:'/account/:id',
            props: true,
            component: AccountPage,
            beforeEnter: AuthGuard
        }


    ],
    mode: 'history'
})