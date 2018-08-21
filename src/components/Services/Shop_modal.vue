<template >
    <v-dialog width="90%" v-model="modal" persistent mt3>

             <v-btn icon medium slot="activator"> <v-icon rigth>{{icon}}</v-icon> </v-btn>

        <v-card>
            <v-container>
                <v-layout row >
                    <v-flex xs-10>
                        <v-card-text>

                        </v-card-text>


                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
        name: "LocationModal",
        props: ['idUser', 'id', 'icon'],
        data() {
            return {
                modal: false,
                shop:{
                    name:"",
                    currencies :[],
                    basicLocation:null,
                    logoImageSrc:null,
                    shortDescription:"",
                    discountRules:[],
                    deliveryModel:null,
                    parselRules:null,
                    buyersList:[]
                }

            }
        },
        computed : {
            ...mapGetters({
                'tradersShops':'tradersShops'
                          }),


        },

        created () {

            if (this.id !== null) {

            }
        },

        updated () {

        },



        methods : {}
    }
</script>

<style scoped>

</style>