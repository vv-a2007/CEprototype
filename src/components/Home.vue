<template>
<div v-if="!loading">
  <v-container fluid>
    <v-layout row>
        <v-flex xs-12>
            <v-carousel>
                <v-carousel-item
                        v-for="(ad,i) in ads"
                        :key="i"
                        :src="ad.src"
                >
                 <div class="car-link">
                     <v-btn class="primary" :to="'/ad/'+ad.id">{{ad.title}}</v-btn>
                 </div>
                </v-carousel-item>
            </v-carousel>
        </v-flex>
    </v-layout>
  </v-container>
    <v-container fluid>
        <v-layout row>
            <v-flex xs-12>

            </v-flex>
        </v-layout>
    </v-container>
</div>
<div v-else>
    <v-container>
        <v-layout row>
            <v-flex xs12 class="text-xs-center pt-5">
                <v-progress-circular
                        :size="100"
                        :width="4"
                        color="primary"
                        indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
    export default {
        data() { return {
               name: "homePage",
               slide: 0,
               ads: [
                      {title:'1', description:'111111', promo:false, src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', id:'123'},
                      {title:'2', description:'222222', promo:false,src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', id:'1234'},
                      {title:'3', description:'333333', promo:false,src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', id:'12345'},
                      {title:'4', description:'444444', promo:false,src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg', id:'123456'}
                    ]
               }
        },
        computed : {
            loading() {return this.$store.getters.loading}
        },
        created () {
          if (this.$route.query['loginError']) {
              this.$store.dispatch('setError','Please log in to access this page.')
          }
        },
        methods :{

        }
    }
</script>

<style scoped>
 .car-link {position: absolute; bottom:50px; left: 50%; background: rgba(0,0,0,5); transform: translate(-50%,0); padding: 5px 15px; border-top-right-radius: 5px; border-top-left-radius: 5px }
</style>