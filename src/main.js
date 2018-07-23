import '@babel/polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router/router'
import store from './store'
import App from './App.vue'
import Vuex from 'vuex'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './plugins/vuetify'

import * as fb from 'firebase'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vuetify);

 new Vue({
            el: "#app",
            render: h => h(App),
            store,
            router

});



