<template>
<div v-if="!loading">
  <v-container fluid>
    <v-layout row>
        <v-flex xs-12>
            <v-carousel hide-delimiters interval="8000">
                <v-carousel-item
                        v-for="(ad,i) in ads"
                        :key="i"
                        :src="ad.imgSrc"
                        @click="this.hidecontrols=!this.hidecontrols"
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
               hidecontrols: true
               }
        },
        computed : {
            loading () {return this.$store.getters.loading},
            ads () { return this.$store.getters.promoAds}
        },
        methods :{
        }
    }
</script>

<style scoped>
 .car-link {position: absolute; bottom:2px; left: 50%; background: rgba(0,0,0,5); transform: translate(-50%,0); padding: 1px 1px; border-top-right-radius: 1px; border-top-left-radius: 1px }
</style>