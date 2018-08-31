<template >
    <v-dialog width="65%" v-model="modal" persistent mt-3 @keydown.esc="modal = false" >

             <v-btn icon medium slot="activator" @click="starting"> <v-icon rigth color="yellow darken-2" >{{icon}}</v-icon> </v-btn>

        <v-card>
            <v-container>
                <v-layout row justify-center wrap>
                    <v-flex xs12>
                        <v-card-title class="headline justify-center">Delivery Model</v-card-title>
                    </v-flex>
                    <v-flex xs12 v-if="deliveryZones.length>0">
                        <v-card-text v-for="(zone, index) in deliveryZones" :key="index">
                            <div style="border: blue thin solid" >
                                <v-layout row no-wrap>

                                  <v-flex fill-height >
                                      <v-card-title style="color: blue" class=" font-weight-bold "><label style="color: black; margin-right: 3%" > Zone name: </label>  {{zone.name}}  </v-card-title>
                                  </v-flex>
                                  <v-flex fill-height >
                                      <v-card-title style="color: red" class=" font-weight-bold "><label style="color: black; margin-right: 3%" > Optimal  delivery weight: </label> {{zone.bestWeight}} </v-card-title>
                                  </v-flex>
                                  <v-flex fill-height >
                                      <v-card-title style="color: darkgreen" class=" font-weight-bold "><label style="color: black; margin-right: 3%" > Delivery price: </label> {{zone.bestPrice}} </v-card-title>
                                  </v-flex>
                                  <v-flex xs1 fill-height mt-3 ml-3>
                                      <v-icon v-if="zone.specialDelivery.length>0" color="red">cake</v-icon>
                                      <v-icon v-else color="grey">cake</v-icon>
                                  </v-flex>
                                  <v-flex xs1 class="text-xs-center" mt-1 >
                                      <add-zone-modal
                                              :id-user="idUser"
                                              :id-shop="idShop"
                                              :index="index"
                                              icon="edit"
                                              color="yellow"
                                              :refresh="starting"
                                      >
                                      </add-zone-modal>
                                  </v-flex>
                                  <v-flex xs1 fill-height mt-2 pl-5>
                                      <v-card-actions justify-content-center>
                                          <v-icon  @click="deliveryZones.splice(index,1)" color="red"  >delete_outline</v-icon>
                                      </v-card-actions>
                                  </v-flex>
                               </v-layout>
                            </div>
                        </v-card-text>

                    </v-flex>
                </v-layout>
                <v-layout row justify-center>
                    <v-flex xs11 row mt-3>
                        <v-card-actions>
                            <add-zone-modal
                                    :id-user="idUser"
                                    :id-shop="idShop"
                                    :index="null"
                                    icon="queue"
                                    color="red darken-1"
                                    :refresh="starting"
                            >
                            </add-zone-modal>
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

import AddZoneModal from "./Add_zone_modal";

class Zone {
    constructor () {
        this.name = "";
        this.expDays = -1;
        this.areas = [];
        this.weightAndCosts = [];
        this.specialDelivery = [];
    }
}

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

    name: "DeliveryZonesModal",

    components: {AddZoneModal},

    props: ['idUser', 'idShop', 'icon', 'refresh'],

    data () {
            return {
                modal: false,
                deliveryZones:[]
            }
        },

    computed : {
            ...mapGetters({
                           'delivZones':'deliveryZones'
                          }),

             allOk() {
                return false;
                }

        },

        updated () {

        },

    methods : {
            starting() {

                this.deliveryZones=[];
                if (!!this.delivZones) {

                    for (let i = 0; i < this.delivZones.length; i++) {
                        this.deliveryZones[i] = new Zone();
                        this.deliveryZones[i].name = this.delivZones[i].name;
                        this.deliveryZones[i].expDays = this.delivZones[i].expDays;
                        this.deliveryZones[i].bestWeight = this.delivZones[i].bestWeight;
                        this.deliveryZones[i].bestPrice = this.delivZones[i].bestPrice;

                        if (!!this.delivZones[i].areas) {
                            this.deliveryZones[i].areas = [];

                            for (let y = 0; y < this.delivZones[i].areas.length; y++) {
                                this.deliveryZones[i].areas[y] = new GeoValue();
                                this.deliveryZones[i].areas[y].id = this.delivZones[i].areas[y].id;
                                this.deliveryZones[i].areas[y].name = this.delivZones[i].areas[y].name;
                            }
                        } else {this.deliveryZones[i].areas = [];}

                        let ar = this.delivZones[i].weightAndCosts;
                        if (!!ar) {
                            this.deliveryZones[i].weightAndCosts = [];
                            for (let y = 0; y < ar.length; y++) {
                                this.deliveryZones[i].weightAndCosts[y] = new ZoneRate();
                                this.deliveryZones[i].weightAndCosts[y].from = ar[y].from;
                                this.deliveryZones[i].weightAndCosts[y].to = ar[y].to;
                                this.deliveryZones[i].weightAndCosts[y].price = ar[y].price;
                            }
                        } else {this.deliveryZones[i].weightAndCosts = [];}

                        let sd = this.delivZones[i].specialDelivery;
                        if (!!sd) {
                            for (let y = 0; y < sd.length; y++) {
                                this.deliveryZones[i].specialDelivery[y] = new SpecialDelivery();
                                this.deliveryZones[i].specialDelivery[y].fromDate = sd[y].fromDate;
                                this.deliveryZones[i].specialDelivery[y].toDate = sd[y].toDate;
                                this.deliveryZones[i].specialDelivery[y].discount = sd[y].discount;
                            }
                        } else {this.deliveryZones[i].specialDelivery=[]}

                    }
                }
            },

            addZone(){
                this.deliveryZones.push(new Zone());

            },
            onCancel () {
                this.refresh();
                this.modal = false;
            },
            onSave () {

               this.$store.dispatch('editDeliveryZones',{idUser:this.idUser, idShop:this.idShop ,deliveryZones:this.deliveryZones}).then(()=>{
                   this.refresh();
               });

                this.modal = false;
            },

        }
    }
</script>

<style scoped>

</style>