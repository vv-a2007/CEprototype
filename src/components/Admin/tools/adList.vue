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
                <v-flex xs6 sm4 md3 lg2 v-for="ad in this.adsList" :key="ad.title" :href="`/ad/`+ad.id">
                    <v-card>
                        <v-card-media
                                :src="ad.imgSrc"
                                height="250px"
                        >
                        </v-card-media>

                        <v-card-title primary-title>
                            <div>
                                <div class="headline">{{ad.title}}</div>
                                <span class="grey--text">{{ad.campaign}}</span>
                            </div>
                        </v-card-title>

                        <v-card-actions>
                            <v-btn flat color="red"
                                   @click="delAd(ad.id)" >Delete</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn flat color="green" :to="`/ad/`+ad.id">Open</v-btn>
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

                <v-flex xs6 sm4 md3 lg2>
                    <v-card style="height: 100%">
                        <v-card-actions style="justify-content:center; align-items:center ">
                                <v-btn large class="success text-xs-center" @click="newAd"> ADD NEW </v-btn>
                        </v-card-actions>
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
                show:false
            }
        },
        computed : {
            adsList (){ return this.$store.getters.ads}
        },
        created() {
            this.$store.dispatch('fetchAds');
        },
        methods : {
            newAd(){
                this.$router.push('/newad')
            },
            delAd(event){
                this.$store.dispatch('delAd', event);
                this.$store.dispatch('fetchAds');
                this.$router.push('/adlist');
            }
        }
    }
</script>

<style scoped>

</style>