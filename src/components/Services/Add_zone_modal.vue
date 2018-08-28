<template >
    <v-dialog width="60%" v-model="modal" persistent mt3>

             <v-btn  icon Large slot="activator" @click="started"> <v-icon rigth :color="color" >{{icon}}</v-icon> </v-btn>

        <v-card>
            <v-container>
                <v-layout row justify-center>
                    <v-flex xs12>

                        <v-card-title v-if="index === null" class="headline justify-center">New delivery zone</v-card-title>
                        <v-card-title v-else class="headline justify-center">Edit delivery zone</v-card-title>

                         <v-layout row no-wrap mt-1>
                           <v-flex xs12 fill-height pa-2 >
                            <div  style="border: medium solid dodgerblue">
                                <v-layout row no-wrap>
                                  <v-flex xs1 fill-height pa-2 >
                                      <v-card-title  style="color: black" class="justify-end font-weight-bold " >Name zone : </v-card-title>
                                  </v-flex>
                                  <v-flex xs6 fill-height pa-2 mt-1>
                                        <v-text-field type="text" solo  :value="zone.name" v-model="zone.name" hide-details>
                                            {{zone.name}}
                                        </v-text-field>
                                  </v-flex>
                                  <v-spacer></v-spacer>
                                  <v-flex xs3 fill-height pa-2 >
                                        <v-card-title style="color: black" class="justify-end font-weight-bold">Expected delivery days : </v-card-title>
                                  </v-flex>
                                    <v-flex xs1 fill-height pa-2 mt-1>
                                        <v-text-field type="text" solo  :value="zone.expDays" v-model="zone.expDays" hide-details>
                                            {{zone.expDays}}
                                        </v-text-field>
                                    </v-flex>
                                    <v-spacer></v-spacer>
                                </v-layout>
                            </div>
                           </v-flex>
                         </v-layout>

                            <v-layout row no-wrap mt-1>
                                <v-flex xs12 fill-height pa-2 >
                                     <div  style="border: medium solid dodgerblue" >
                                         <v-card-title style="color: black" class=" font-weight-bold ">Zone areas : </v-card-title>
                                         <v-autocomplete
                                                 v-model="zone.areas"
                                                 :items="arrayItemNames"
                                                 color="blue"
                                                 return-object
                                                 item-text="name"
                                                 item-value="id"
                                                 id="id"
                                                 label="Search areas"
                                                 @change=""
                                                 placeholder="Start enter for looking of location"
                                                 prepend-inner-icon="youtube_searched_for"
                                                 autofocus
                                                 clearable
                                                 multiple
                                                 box
                                                 chips
                                                 hide-selected
                                                 deletable-chips
                                                 no-data-text="loading..."
                                         >
                                         </v-autocomplete>
                                     </div>
                                </v-flex>
                             </v-layout>


                        <v-layout row no-wrap>
                            <v-flex xs12 fill-height pa-2>
                            <div style="border:  medium solid dodgerblue ">
                              <v-layout row no-wrap>
                                <v-flex xs2>
                                <v-layout row>
                                    <v-flex fill-height>
                                      <v-flex >
                                        <v-card-title style="color: black" class=" font-weight-bold ">Weight and Costs : </v-card-title>
                                    </v-flex>
                                    <v-flex ml-5 pl-2 pb-3>
                                        <v-icon @click="addZoneRate()" color="red" >add_box</v-icon>
                                    </v-flex>
                                  </v-flex>
                                </v-layout>
                                </v-flex>
                                <v-flex xs10>
                                 <v-layout row  v-if="zone.weightAndCosts.length>0" wrap>
                                    <v-flex my-2 fill-height v-for="(cost, index) in zone.weightAndCosts" :key="index">
                                        <v-layout row justify-center >
                                            <v-flex xs3 ml-2>
                                                <v-text-field type="integer" mask="########" label="From" :value="cost.from" v-model="cost.from"  hide-details outline>{{cost.from}}</v-text-field>
                                            </v-flex>
                                            <v-flex xs3 ml-2>
                                                <v-text-field type="integer" mask="########" label="To" :value="cost.to" v-model="cost.to"  hide-details outline>{{cost.to}}</v-text-field>
                                            </v-flex>
                                            <v-flex xs3 ml-2>
                                                <v-text-field type="integer" mask="##" label="Price" :value="cost.price" v-model="cost.price"  hide-details outline>{{cost.price}}</v-text-field>
                                            </v-flex>
                                            <v-flex xs1 class="text-xs-center" mt-3>
                                                <span class="font-weight-bold"> {{cur}} </span>
                                            </v-flex >
                                            <v-flex xs1 class="text-xs-center" mt-2 >
                                                <v-card-actions >
                                                    <v-icon  @click="zone.weightAndCosts.splice(index,1)" color="red">delete_outline</v-icon>
                                                </v-card-actions>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                 </v-layout>
                                </v-flex>
                              </v-layout>
                            </div>
                            </v-flex>
                        </v-layout>

                            <v-layout row >
                                <v-flex fill-height pa-2>
                                   <div style="border:  medium solid dodgerblue ">
                                     <v-layout row no-wrap>
                                        <v-flex xs1 fill-height mt-3 ml-5 pl-3>
                                            <v-icon color="red">cake</v-icon>
                                        </v-flex>
                                        <v-flex fill-height ma-2>
                                            <v-card-title style="color: black" class=" font-weight-bold "  > Special promo list : </v-card-title>
                                       </v-flex>
                                     </v-layout>
                                  </div>
                                </v-flex>
                            </v-layout>

                    </v-flex>
                </v-layout>
                <v-layout row justify-center>
                    <v-flex xs11 row mt-3>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat class="grey" @click="onCancel" >Cancel</v-btn>
                            <v-btn v-if="index === null" button class="success" @click="onSave" :disabled="!allOk">Add Zone</v-btn>
                            <v-btn v-else button class="success" @click="onSave" :disabled="!allOk">Save Zone</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>

import { mapGetters } from 'vuex';

class GeoValue {
    constructor(id = null, name = "") {
        this.id = id;
        this.name = name;
    }
}
class ZoneRate {
    constructor() {
        this.from = null;
        this.to = null;
        this.price = null;
    }
}
export default {

        name: "AddZoneModal",

        props: ['idUser', 'idShop', 'icon', 'color', 'refresh', 'index'],

        data() {
            return {
                modal: false,

                zone:{
                    name:"",
                    expDays:-1,
                    areas:[],
                    weightAndCosts:[]
                },

            }
        },

        computed : {
            ...mapGetters({
                           'delivZones':'deliveryZones',
                           'arrayItemNames':'allItemNames'
                          }),

            cur () {return this.$store.getters.getShop(this.idShop).currency.currName},

             allOk() {
                return !!this.zone.name && this.zone.expDays > -1 && this.zone.areas !== [];
                }

        },

        created () {

        },



        methods : {

            started() {
                this.$store.dispatch('getAllItemNames');
                this.zone = new Object({name:"", expDays:-1, areas:[], weightAndCosts:[]});

                if (this.index !== null) {

                    this.zone.name = this.delivZones[this.index].name;
                    this.zone.expDays = this.delivZones[this.index].expDays;


                    if (!!this.delivZones[this.index].areas) {
                        for (let y = 0; y < this.delivZones[this.index].areas.length; y++) {
                            this.zone.areas[y] = new GeoValue();
                            this.zone.areas[y].id = this.delivZones[this.index].areas[y].id;
                            this.zone.areas[y].name = this.delivZones[this.index].areas[y].name;
                        }
                    }

                    let ar = this.delivZones[this.index].weightAndCosts;
                    if (!!ar) {
                        for (let i = 0; i < ar.length; i++) {
                            this.zone.weightAndCosts[i] = new ZoneRate();
                            this.zone.weightAndCosts[i].from = ar[i].from;
                            this.zone.weightAndCosts[i].to = ar[i].to;
                            this.zone.weightAndCosts[i].price = ar[i].price;
                        }
                    }
                }
            },

            onCancel () {

                this.modal = false;
            },

            addZoneRate () { this.zone.weightAndCosts.push(new ZoneRate())},

            onSave () {
               if (this.index === null) {
                    this.$store.dispatch('addDeliveryZone',{idUser:this.idUser, idShop:this.idShop ,zone:this.zone}).then(()=>{
                      this.refresh();
                      this.modal = false;
                    });
               } else {
                   this.$store.dispatch('editDeliveryZone',{idUser:this.idUser, idShop:this.idShop ,zone:this.zone, index:this.index}).then(()=>{
                       this.refresh();
                       this.modal = false;
                   });
               }
            }

        }
    }
</script>

<style scoped>

</style>