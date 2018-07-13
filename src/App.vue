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
           <v-list-tile-action>
             <v-icon v-if="item.icon" >{{item.icon}}</v-icon>
           </v-list-tile-action>

           <v-list-tile-content>
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
           <v-list-tile-action>
             <v-icon v-if="item.icon" >{{item.icon}}</v-icon>
           </v-list-tile-action>

           <v-list-tile-content>
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

     <v-footer app></v-footer>
     </v-layout>
   </v-container>
  </v-app>
</template>

<script>
export default {
    data () {
        return {
            name: 'App',
            user:null,
            drawer: false,
            leftLinks :[
                {icon:'home', title:'Home', link:'/', checkLog:false},
                {icon:'shopping_cart', title:'Shopping', link:'/shopping', checkLog:true},
                {icon:'monetization_on', title:'Trading', link:'/trading', checkLog:true}
            ],
            rightLinks :[
                {icon:'face', title:'Login', link:'/login', checkLog:false},
                {icon:'perm_identity', title:'Registration', link:'/registration', checkLog:false},
                {icon:'build', title:'tools', link:'/tools', checkLog:true}
            ],
        }
    },
    computed : {

        error () { if (this.$store.getters.error) {
            return this.$store.getters.error}
        else { return null}},

        isUserLogin () {return this.$store.getters.isUserLogin}
    },
    methods: {
        closeError(){
            this.$store.dispatch('clearError')
        },
        logOut (){
            this.$store.dispatch('logOutUser');
            this.$router.push('/')
        }
    },
}
</script>
<style scoped>
  .pointer{cursor:pointer}
</style>
