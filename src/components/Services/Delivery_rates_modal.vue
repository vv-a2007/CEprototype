<template >
    <v-dialog width="40%" v-model="modal" persistent mt3>

             <v-btn icon medium slot="activator" @click="start"> <v-icon rigth color="yellow darken-2" >{{icon}}</v-icon> </v-btn>

        <v-card>
            <v-container>
                <v-layout row justify-center>
                    <v-flex xs12>
                        <v-card-title class="headline justify-center">Delivery Model</v-card-title>
                        <v-card-text v-for="(zone, index) in deliveryRates" :key="index">
                           <v-layout row justify-center >
                               <v-flex xs3 ml-2>

                               </v-flex>

                               <v-flex xs1 class="text-xs-center" mt-2 >
                                   <v-card-actions >
                                       <v-icon  @click="deliveryRates.splice(index,1)" color="red">delete_outline</v-icon>
                                   </v-card-actions>
                               </v-flex>
                           </v-layout>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center>
                    <v-flex xs11 row mt-3>
                        <v-card-actions>
                            <v-btn button class="yellow" @click="addZone">Add delivery zone</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn flat class="grey" @click="onCancel" >Cancel</v-btn>
                            <v-btn button class="success" @click="onSave" :disabled="!allOk">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>

import { mapGetters } from 'vuex';
class Delivery {
    constructor () {

    }
}
export default {
        name: "DeliveryRatesModal",
        props: ['idUser', 'idShop', 'icon', 'refresh'],
        data() {
            return {
                modal: false,
                deliveryRates:[]
            }
        },
        computed : {
            ...mapGetters({
                           'delivRates':'deliveryRates'
                          }),

             allOk() {
                return false;
                }

        },

        updated () {

        },



        methods : {
            start() {
                if (!!this.delivRates){
                    this.deliveryRates=[];
                    for (let i = 0; i < this.delivRates.length; i++) {

                    }
                } else {this.deliveryRates=[]}

            },
            addZone(){
                this.deliveryRates.push(new Delivery());

            },
            onCancel () {

                this.modal = false;
            },
            onSave () {

               this.$store.dispatch('editDeliveryRates',{idUser:this.idUser, idShop:this.idShop ,deliveryRates:this.deliveryRates}).then(()=>{
                   this.refresh();
               });

                this.modal = false;
            },

        }
    }
</script>

<style scoped>

</style>