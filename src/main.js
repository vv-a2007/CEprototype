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
            router,
            created() {

             fb.initializeApp({
                    apiKey: "AIzaSyDPFj5DyA8_uB4jblmD3eRGfK8242P6c7M",
                    authDomain: "betace-bfeb6.firebaseapp.com",
                    databaseURL: "https://betace-bfeb6.firebaseio.com",
                    projectId: "betace-bfeb6",
                    storageBucket: "betace-bfeb6.appspot.com",
                    messagingSenderId: "24362690064"
                });

             fb.auth().onAuthStateChanged(user => {
                    if (user) {
                         this.$store.dispatch('autoLoginUser', user);
                     }
             });

              this.$store.dispatch('fetchAds');


    }

});



