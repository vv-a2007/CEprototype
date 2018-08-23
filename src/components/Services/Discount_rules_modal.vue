<template >
    <v-dialog width="40%" v-model="modal" persistent mt3>

             <v-btn icon medium slot="activator" @click="start"> <v-icon rigth color="yellow darken-2" >{{icon}}</v-icon> </v-btn>

        <v-card>
            <v-container>
                <v-layout row justify-center>
                    <v-flex xs12>
                        <v-card-title class="headline justify-center">Discount rules</v-card-title>
                        <v-card-text v-for="(discount, index) in discountRules" :key="index">
                           <v-layout row justify-center >
                               <v-flex xs3 ml-2>
                                   <v-text-field type="integer" mask="########" label="From" :value="discount.from" v-model="discount.from"  hide-details outline>{{discount.from}}</v-text-field>
                               </v-flex>
                               <v-flex xs3 ml-2>
                                   <v-text-field type="integer" mask="########" label="To" :value="discount.to" v-model="discount.to"  hide-details outline>{{discount.to}}</v-text-field>
                               </v-flex>
                               <v-flex xs3 ml-2>
                                   <v-text-field type="integer" mask="##" label="Discount" :value="discount.disc" v-model="discount.disc"  hide-details outline>{{discount.disc}}</v-text-field>
                               </v-flex>
                               <v-flex xs1 class="text-xs-center" mt-3>
                                   <span class="font-weight-bold"> %% </span>
                               </v-flex >
                               <v-flex xs1 class="text-xs-center" mt-2 >
                                   <v-card-actions >
                                       <v-icon  @click="discountRules.splice(index,1)" color="red">delete_outline</v-icon>
                                   </v-card-actions>
                               </v-flex>
                           </v-layout>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center>
                    <v-flex xs11 row mt-3>
                        <v-card-actions>
                            <v-btn button class="yellow" @click="addDisc">Add discount</v-btn>
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
class Discount {
    constructor () {
        this.from = null;
        this.to = null;
        this.disc = null;
    }
}
export default {
        name: "DiscountRulesModal",
        props: ['idUser', 'idShop', 'icon', 'refresh'],
        data() {
            return {
                modal: false,
                discountRules:[]
            }
        },
        computed : {
            ...mapGetters({
                           'discRules':'discountRules'
                          }),
            allOk () { let ok=false;
                       for (let i = 0; i < this.discountRules.length; i++) {
                          ok = !!this.discountRules[i].from && !!this.discountRules[i].to && !!this.discountRules[i].disc;
                    }
                    return ok;
                }

        },

        updated () {

        },



        methods : {
            start() {
                if (!!this.discRules){
                    this.discountRules=[];
                    for (let i = 0; i < this.discRules.length; i++) {
                        let dis = new Discount();
                        dis.from = this.discRules[i].from;
                        dis.to = this.discRules[i].to;
                        dis.disc = this.discRules[i].disc;
                        this.discountRules.push(dis);
                    }
                } else {this.discountRules=[]}

            },
            addDisc(){
                this.discountRules.push(new Discount());
                if (this.discountRules.length>1) {this.discountRules[this.discountRules.length-1].from = this.discountRules[this.discountRules.length-2].to}
            },
            onCancel () {

                this.modal = false;
            },
            onSave () {

               this.$store.dispatch('editDiscountRules',{idUser:this.idUser, idShop:this.idShop ,discountRules:this.discountRules}).then(()=>{
                   this.refresh();
               });

                this.modal = false;
            },

        }
    }
</script>

<style scoped>

</style>