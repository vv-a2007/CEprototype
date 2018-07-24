<template>
  <v-app>
   <v-container align-center>
     <v-layout>
     <v-navigation-drawer
             app
             temporary
             v-model="drawer">
       <v-list>
         <v-list-tile
                 v-for="item in leftLinks"
                 :key="item.title"
                 :to="item.link"
         >
           <v-list-tile-action  >
             <v-icon v-if="item.icon">{{item.icon}}</v-icon>
           </v-list-tile-action>

           <v-list-tile-content  >
             <v-list-tile-title v-text="item.title"></v-list-tile-title>
           </v-list-tile-content>

         </v-list-tile>
       </v-list>
       <v-spacer></v-spacer>
       <v-list>
         <v-list-tile
                 v-for="item in rightLinks"
                 :key="item.title"
                 :to="item.link"
         >
           <v-list-tile-action >
             <v-icon v-if="item.icon" >{{item.icon}}</v-icon>
           </v-list-tile-action>

           <v-list-tile-content >
             <v-list-tile-title v-text="item.title"></v-list-tile-title>
           </v-list-tile-content>

         </v-list-tile>
       </v-list>

     </v-navigation-drawer>

     <v-toolbar app dark color="primary">

       <v-toolbar-side-icon
          @click="drawer=!drawer"
          class="hidden-md-and-up">
       </v-toolbar-side-icon>

       <v-toolbar-title>
         <router-link to="/" tag="span" class="pointer">CE project</router-link>
       </v-toolbar-title>

       <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat
               v-for="item in leftLinks"
               :key="item.title"
               :to="item.link"
               v-show="showMenuItem(item.showNotUser,item.showUser)"
        >
          <v-icon left
                  v-if="item.icon"
                  >{{item.icon}}
          </v-icon>
          {{item.title}}
        </v-btn>
       </v-toolbar-items>

       <v-spacer></v-spacer>

       <v-toolbar-items class="hidden-sm-and-down">
       <v-btn flat
              v-for="item in rightLinks"
              :key="item.title"
              :to="item.link"
              v-show="showMenuItem(item.showNotUser,item.showUser)"
       >
         <v-icon left
                 v-if="item.icon"
                 >{{item.icon}}
         </v-icon>
         {{item.title}}
       </v-btn>
       </v-toolbar-items>

     </v-toolbar>

     <v-content>
        <router-view></router-view>
     </v-content>

    <template v-if="error">
       <v-snackbar
               :timeout="10000"
               :multi-line="true"
               color="error"
               @input="closeError"
               :value="true"
               bottom
               auto-height
               vertical
       >
         {{ error }}
         <v-btn
                 dark
                 flat
                 @click="closeError"
         >
           Close
         </v-btn>
       </v-snackbar>
    </template>

     <v-footer app></v-footer>
     </v-layout>
   </v-container>
  </v-app>
</template>

<script>

import * as fb from 'firebase';

export default {
    data () {
        return {
            name: 'App',
            drawer: false,
            userpath: '',
            leftLinks :[
                {icon:'home', title:'Home', link:'/', showNotUser:true, showUser:true},
                {icon:'shopping_cart', title:'Shopping', link:'/shopping', showNotUser:false, showUser:true},
                {icon:'monetization_on', title:'Trading', link:'/trading', showNotUser:false, showUser:true},

            ],
            rightLinks :[
                {icon:'build', title:'tools', link:'/tools', showNotUser:false, showUser:true},
                {icon:'face', title:'Login', link:'/login', showNotUser:true,showUser:false },
                {icon:'perm_identity', title:'Registration', link:'/registration', showNotUser:true, showUser:false},
                {icon:'perm_identity', title:'Account', link: '/account', showNotUser:false, showUser:true},
                {icon:'exit_to_app', title:'Log Out', link:'/logout', showNotUser:false, showUser:true}
            ],
        }
    },

    created () {

        fb.initializeApp({
            apiKey: "AIzaSyDPFj5DyA8_uB4jblmD3eRGfK8242P6c7M",
            authDomain: "betace-bfeb6.firebaseapp.com",
            databaseURL: "https://betace-bfeb6.firebaseio.com",
            projectId: "betace-bfeb6",
            storageBucket: "betace-bfeb6.appspot.com",
            messagingSenderId: "24362690064"
        });

        fb.auth().onAuthStateChanged(user => {
            if (user && !this.$store.getters.isUserLogin) {
                this.$store.dispatch('autoLoginUser', user);
                this.$router.push('/')
            }
        });


    },

    mounted (){

        this.$store.dispatch('fetchAds');


    },

    computed : {

        error () {
            if (this.$store.getters.error) {
                return this.$store.getters.error
            }
            else {
                return null
            }
        },

        isUserLogin () {
            return this.$store.getters.isUserLogin
        },

    },
    methods: {
        closeError(){
            this.$store.dispatch('clearError')
        },
        logOut (){
            this.$store.dispatch('logOutUser');
            this.$router.push('/')
        },
        showMenuItem (showNotUser, showUser) { return ( (showNotUser && (!this.isUserLogin)) || (showUser && this.isUserLogin))}
    }
}
</script>
<style scoped>
  .pointer{cursor:pointer}
</style>
