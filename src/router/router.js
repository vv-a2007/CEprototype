import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import AuthGuard from './auth-guard'
import homePage from '../components/Home.vue'
import shoppingPage from '../components/Shopping.vue'
import tradingPage from '../components/Trading.vue'
import newAd from '../components/Admin/tools/newAd.vue'
import loginPage from '../components/Auth/Login.vue'
import registrationPage from '../components/Auth/Registration.vue'
import toolsPage from '../components/Admin/Tools.vue'
import adListPage from '../components/Admin/tools/adList.vue'
import newAdPage from '../components/Admin/tools/newAd.vue'

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
 //           beforeEnter: AuthGuard
        },
        {
            path:'/trading',
            component: tradingPage,
//            beforeEnter: AuthGuard
        },
        {
            path:'/login',
            component: loginPage
        },
        {
            path:'/registration',
            component: registrationPage
        },
        {
            path:'/tools',
            component: toolsPage,
 //           beforeEnter: AuthGuard
        },
        {
            path:'/adlist',
            component: adListPage,
  //          beforeEnter: AuthGuard
        },
        {
            path:'/newad',
            component: newAdPage,
  //          beforeEnter: AuthGuard
        }

    ],
    mode: 'history'
})