<template>
    <div>
        <v-container>
            <v-layout row >
                <v-flex xs-12 justify-center wrap >
                    <h1 class="text--headline mb5 text-xs-center ">Advertising ads</h1>
                </v-flex>
            </v-layout>
        </v-container>
        <v-spacer></v-spacer>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg3 v-for="ad in adsList" :key="ad.title">
                    <v-card>
                        <v-card-media
                                :src="ad.src"
                                height="150px"
                        >
                        </v-card-media>

                        <v-card-title primary-title>
                            <div>
                                <div class="headline">{{ad.title}}</div>
                                <span class="grey--text">{{ad.campaign}}</span>
                            </div>
                        </v-card-title>

                        <v-card-actions>
                            <v-btn flat color="red" >Delete</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn flat color="green">Edit</v-btn>
                            <v-btn icon @click="show = !show">
                                <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
                            </v-btn>
                        </v-card-actions>

                        <v-slide-y-transition>
                            <v-card-text v-show="show">
                                {{ad.description}}
                            </v-card-text>
                        </v-slide-y-transition>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "adList",
        data() {
            return {
                adsList:[
                    {title:'1', description:'111111', campaign:"dffer", promo:false, src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', id:'123'},
                    {title:'2', description:'222222', campaign:"dfdfdg", promo:false, src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', id:'1234'},
                    {title:'3', description:'333333', campaign:"dsfds", promo:false, src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', id:'12345'},
                    {title:'4', description:'444444', campaign:"ryrrtr", promo:false, src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg', id:'123456'}
                    ],
                show:false
            }
        },
        created() {

        }
    }
</script>

<style scoped>

</style>