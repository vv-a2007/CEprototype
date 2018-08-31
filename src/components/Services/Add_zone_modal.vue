<template >
    <v-dialog width="60%" v-model="modal" persistent mt-3 @keydown.esc="modal = false" >

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
                                    <v-flex align-center>
                                        <v-card-title style="color: black" class="text-xs-center font-weight-bold" align="center">Weight and Costs : </v-card-title>
                                    </v-flex>
                                    <v-flex class="text-xs-center" pb-3>
                                        <v-icon @click="addZoneRate()" color="red" >add_box</v-icon>
                                    </v-flex>
                                </v-flex>
                                 <v-layout row  v-if="zone.weightAndCosts.length>0" wrap>
                                    <v-flex my-2  v-for="(cost, index) in zone.weightAndCosts" :key="index" >
                                        <v-layout row justify-center >
                                            <v-flex xs2 ml-2>
                                                <v-text-field type="integer" mask="########" label="From" :value="cost.from" v-model="cost.from"  hide-details outline v-if="index===optimalIndex" style="background-color: palegreen" @input="optIndex">{{cost.from}}</v-text-field>
                                                <v-text-field type="integer" mask="########" label="From" :value="cost.from" v-model="cost.from"  hide-details outline v-else @input="optIndex">{{cost.from}}</v-text-field>
                                            </v-flex>
                                            <v-flex xs2 ml-2>
                                                <v-text-field type="integer" mask="########" label="To" :value="cost.to" v-model="cost.to"  hide-details outline v-if="index===optimalIndex" style="background-color: palegreen" @input="optIndex">{{cost.to}}</v-text-field>
                                                <v-text-field type="integer" mask="########" label="To" :value="cost.to" v-model="cost.to"  hide-details outline v-else @input="optIndex">{{cost.to}}</v-text-field>
                                            </v-flex>
                                            <v-flex xs2 class="text-xs-center" mt-3>
                                                <span class="font-weight-bold" style="color: darkgreen"> Kg </span>
                                            </v-flex >
                                            <v-flex xs2 ml-2>
                                                <v-text-field type="integer" mask="#######" label="Delivery price" :value="cost.price" v-model="cost.price"  hide-details outline v-if="index===optimalIndex" style="background-color: palegreen" @input="optIndex">{{cost.price}}</v-text-field>
                                                <v-text-field type="integer" mask="#######" label="Delivery price" :value="cost.price" v-model="cost.price"  hide-details outline v-else  @input="optIndex">{{cost.price}}</v-text-field>
                                            </v-flex>
                                            <v-flex xs2 class="text-xs-center" mt-3>
                                                <span class="font-weight-bold"> {{cur}} </span>
                                            </v-flex >
                                            <v-flex xs2 class="text-xs-center" mt-2 >
                                                <v-card-actions >
                                                    <v-icon  @click="delRate(index)" color="red">delete_outline</v-icon>
                                                </v-card-actions>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                 </v-layout>
                              </v-layout>
                            </div>
                           </v-flex>
                        </v-layout>

                            <v-layout row >
                                <v-flex fill-height pa-2>
                                   <div style="border:  medium solid dodgerblue ">
                                     <v-layout row no-wrap justify-center>
                                        <v-flex xs2 >
                                               <v-flex>
                                                 <v-card-title style="color: black" class=" font-weight-bold "  > Special promo delivery dates : </v-card-title>
                                               </v-flex>
                                               <v-flex class="text-xs-center" >
                                                   <v-icon @click="addSpecialPromo" color="red"  >add_box</v-icon>
                                               </v-flex>
                                        </v-flex>
                                       <v-layout row  v-if="zone.specialDelivery.length>0" wrap>
                                           <v-flex xs12 my-2  v-for="(promo, index) in zone.specialDelivery" :key="index">
                                               <v-layout row justify-end wrap>
                                                   <v-spacer></v-spacer>
                                                   <v-flex xs3 ml-2>
                                                       <v-menu
                                                               ref="menu[0][index]"
                                                               :close-on-content-click="false"
                                                               v-model="menu[0][index]"
                                                               :nudge-right="40"
                                                               lazy
                                                               transition="scale-transition"
                                                               offset-x
                                                               full-width
                                                               min-width="290px"
                                                       >
                                                           <v-text-field
                                                                   slot="activator"
                                                                   v-model="promo.fromDate"
                                                                   label="From date"
                                                                   prepend-icon="event"
                                                                   readonly
                                                           ></v-text-field>
                                                           <v-date-picker
                                                                   v-model="date"
                                                                   @input="promo.fromDate = formatDate(date); menu[0][index]=false"
                                                                   first-day-of-week="1"
                                                           ></v-date-picker>

                                                       </v-menu>
                                                   </v-flex>
                                                   <v-flex xs3 ml-2>
                                                       <v-menu
                                                               ref="menu[1][index]"
                                                               :close-on-content-click="false"
                                                               v-model="menu[1][index]"
                                                               :nudge-right="40"
                                                               lazy
                                                               transition="scale-transition"
                                                               offset-x
                                                               full-width
                                                               min-width="290px"
                                                       >
                                                           <v-text-field
                                                                   slot="activator"
                                                                   v-model="promo.toDate"
                                                                   label="To date"
                                                                   prepend-icon="event"
                                                                   readonly
                                                           ></v-text-field>
                                                           <v-date-picker
                                                                   v-model="date"
                                                                   :min="parseDate(promo.fromDate)"
                                                                   @input="promo.toDate = formatDate(date); menu[1][index]=false"
                                                                   first-day-of-week="1"
                                                           ></v-date-picker>

                                                       </v-menu>
                                                   </v-flex>
                                                   <v-flex xs3 ml-2>
                                                       <v-text-field
                                                               v-model="promo.discount"
                                                               label="Discount %%"
                                                               prepend-icon="event"
                                                               type="integer" mask="###"
                                                       ></v-text-field>
                                                   </v-flex>
                                                   <v-flex xs2 class="text-xs-center" mt-2 >
                                                       <v-card-actions >
                                                           <v-icon  @click="zone.specialDelivery.splice(index,1)" color="red">delete_outline</v-icon>
                                                       </v-card-actions>
                                                   </v-flex>
                                               </v-layout>
                                           </v-flex>
                                       </v-layout>
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
class SpecialDelivery {
    constructor() {
        this.fromDate = null;
        this.toDate = null;
        this.discount = 0;
    }
}
export default {

        name: "AddZoneModal",

        props: ['idUser', 'idShop', 'icon', 'color', 'refresh', 'index'],

        data() {
            return {
                modal: false,
                menu:[[],[]],
                date: null,
                optimalIndex:-1,
                zone:{
                    name:"",
                    expDays:-1,
                    areas:[],
                    weightAndCosts:[],
                    bestWeight:null,
                    bestPrice:null,
                    specialDelivery:[]
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
                },

        },


        methods : {

            started() {
                this.$store.dispatch('getAllItemNames');
                this.zone = new Object({name:"", expDays:-1, areas:[], weightAndCosts:[], specialDelivery:[]});

                if (this.index !== null) {

                    this.zone.name = this.delivZones[this.index].name;
                    this.zone.expDays = this.delivZones[this.index].expDays;
                    this.zone.bestWeight = this.delivZones[this.index].bestWeight;
                    this.zone.bestPrice = this.delivZones[this.index].bestPrice;

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
                    let sd = this.delivZones[this.index].specialDelivery;
                    if (!!sd) {
                        for (let i = 0; i < sd.length; i++) {
                            this.zone.specialDelivery[i] = new SpecialDelivery();
                            this.zone.specialDelivery[i].fromDate = sd[i].fromDate;
                            this.zone.specialDelivery[i].toDate = sd[i].toDate;
                            this.zone.specialDelivery[i].discount = sd[i].discount;
                        }
                    }
                }
                this.optIndex();
            },


            optIndex () {
                let opt = 999999999999999999; let ind=-1;
                for (let i=0; i<this.zone.weightAndCosts.length; i++) {
                    if ((this.zone.weightAndCosts[i].price/this.zone.weightAndCosts[i].to) <= opt) {opt=(this.zone.weightAndCosts[i].price/this.zone.weightAndCosts[i].to); ind=i}
                }
                if (ind>-1) {this.zone.bestWeight = this.zone.weightAndCosts[ind].to; this.zone.bestPrice = this.zone.weightAndCosts[ind].price;}
                this.optimalIndex = ind;
            },

            onCancel () {

                this.modal = false;
            },

            addZoneRate () {
                this.zone.weightAndCosts.push(new ZoneRate());
                if (this.zone.weightAndCosts.length>1) {this.zone.weightAndCosts[this.zone.weightAndCosts.length-1].from = this.zone.weightAndCosts[this.zone.weightAndCosts.length-2].to}

            },

            addSpecialPromo () { this.zone.specialDelivery.push(new SpecialDelivery())},

            delRate (i) {
                this.zone.weightAndCosts.splice(i,1);
                this.optIndex();
            },

            formatDate (date) {
                if (!date) return null;
                const [year, month, day] = date.split('-');
                return `${day}/${month}/${year}`
            },
            parseDate (date) {
                if (!date) return null;
                const [day, month, year] = date.split('/');
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
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