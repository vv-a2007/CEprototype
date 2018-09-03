<template >
    <v-dialog width="40%" v-model="modal" persistent mt-3 @keydown.esc="modal = false">

             <v-btn icon medium slot="activator" @click="start"> <v-icon rigth color="yellow darken-2" >{{icon}}</v-icon> </v-btn>

        <v-card>
            <v-container>
                <v-layout row justify-center>
                    <v-flex xs12>
                        <v-card-title class="headline justify-center" style="color:blue" >Discount rules</v-card-title>

                        <v-card-text type="headline"  style="font-weight:bold; color:forestgreen">Basic rules:</v-card-text>
                        <div style="border:  medium solid forestgreen ">
                        <v-card-text v-for="(discount, index) in discountRules" :key="index">
                           <v-layout row justify-center >
                               <v-flex xs3 ml-2>
                                   <v-text-field type="integer" mask="########" label="From" :value="discount.from" v-model="discount.from"  hide-details outline>{{discount.from}}</v-text-field>
                               </v-flex>
                               <v-flex xs3 ml-2>
                                   <v-text-field type="integer" mask="########" label="To" :value="discount.to" v-model="discount.to"  hide-details outline>{{discount.to}}</v-text-field>
                               </v-flex>
                               <v-flex xs2 class="text-xs-center" mt-3>
                                   <span class="font-weight-bold"> {{cur}} </span>
                               </v-flex >
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
                         <v-layout row ml-2>
                                <v-flex xs11 row mt-3>
                                    <v-card-actions>
                                       <v-btn button small  style="color:white; background-color: forestgreen" @click="addDisc">Add discount range</v-btn>
                                       <v-spacer></v-spacer>
                                  </v-card-actions>
                                </v-flex>
                           </v-layout>
                        </div>

                        <v-card-text type="headline"  style="font-weight:bold; color:darkorange">Promo rules:</v-card-text>

                        <div style="border:  medium solid orange ">
                        <v-layout row  v-if="promoRules.length>0" wrap ma-2>
                            <v-flex xs12 ma-2 v-for="(promo, index) in promoRules" :key="index">
                                <div  style="border:  medium solid firebrick ">
                                <v-layout row justify-arround no-wrap ma-2>
                                    <v-flex xs6 mx-2>
                                        <v-text-field
                                                type="text"
                                                label="Campaign name"
                                                :value="promo.campaign"
                                                v-model="promo.campaign"
                                                hide-details
                                                color="red darken-4"
                                        >{{promo.campaign}}</v-text-field>
                                    </v-flex>
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
                                </v-layout>

                                    <v-layout row  v-if="promo.promoDiscounts.length>0" wrap>
                                      <v-spacer></v-spacer>
                                      <v-card-text v-for="(discount, indexX) in promo.promoDiscounts" :key="indexX">
                                        <v-layout row justify-end >
                                            <v-flex xs3 ml-2>
                                                <v-text-field type="integer" mask="########" label="From" :value="discount.from" v-model="discount.from"  hide-details outline>{{discount.from}}</v-text-field>
                                            </v-flex>
                                            <v-flex xs3 ml-2>
                                                <v-text-field type="integer" mask="########" label="To" :value="discount.to" v-model="discount.to"  hide-details outline>{{discount.to}}</v-text-field>
                                            </v-flex>
                                            <v-flex xs2 class="text-xs-center" mt-3>
                                                <span class="font-weight-bold"> {{cur}} </span>
                                            </v-flex >
                                            <v-flex xs3 ml-2>
                                                <v-text-field type="integer" mask="##" label="Discount" :value="discount.disc" v-model="discount.disc"  hide-details outline>{{discount.disc}}</v-text-field>
                                            </v-flex>
                                            <v-flex xs1 class="text-xs-center" mt-3>
                                                <span class="font-weight-bold"> %% </span>
                                            </v-flex >
                                            <v-flex xs1 class="text-xs-center" mt-2 >
                                                <v-card-actions >
                                                    <v-icon  @click="promoRules.splice(indexX,1)" color="red">delete_outline</v-icon>
                                                </v-card-actions>
                                            </v-flex>
                                        </v-layout>
                                      </v-card-text>
                                    </v-layout>

                                <v-layout row >
                                    <v-flex xs11 row mb-1 >
                                        <v-card-actions>
                                            <v-btn button small style="color:white; background-color: firebrick" @click="addPromoDisc(index)">Add discount range</v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <div  >
                                            <v-autocomplete
                                                    v-model="promo.promoLocations"
                                                    :items="arrayItemNames"
                                                    color="red darken-4"
                                                    return-object
                                                    item-text="name"
                                                    item-value="id"
                                                    id="id"
                                                    label="Only in locations"
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

                                <v-spacer></v-spacer>
                                </div>
                            </v-flex>

                        </v-layout>

                        <v-layout row >
                            <v-flex xs11 row ml-2>
                                <v-card-actions>
                                    <v-btn button small class="orange" @click="addPromo">Add Promo Campaign</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>

                        </div>
                       <v-layout row justify-center>
                           <v-flex xs11 row mt-3>
                               <v-card-actions>
                                   <v-spacer></v-spacer>
                                   <v-btn flat class="grey" @click="onCancel" >Cancel</v-btn>
                                   <v-btn button class="success" @click="onSave" :disabled="!allOk">Save</v-btn>
                               </v-card-actions>
                           </v-flex>
                       </v-layout>

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
class Promo {
    constructor () {
       this.dateFrom = null;
       this.dateTo = null;
       this.promoDiscounts = [];
       this.campaign = "";
       this.promoLocations = []
    }
}
export default {

        name: "DiscountRulesModal",

        props: ['idUser', 'idShop', 'icon', 'refresh'],

        data() {
            return {
                modal: false,
                menu:[[],[]],
                date: null,
                discountRules:[],
                promoRules : []
            }
        },

        computed : {
            ...mapGetters({
                           'discRules':'discountRules',
                           'promRules':'promoRules',
                           'arrayItemNames':'allItemNames'
                          }),

            cur () {return this.$store.getters.getShop(this.idShop).currency.currName},

            allOk () { let okDisc = true;
                       for (let i = 0; i < this.discountRules.length; i++) {
                          okDisc = okDisc && (!!this.discountRules[i].from && !!this.discountRules[i].to && !!this.discountRules[i].disc);
                       }
                       let okPromo = true;
                       for (let i = 0; i < this.promoRules.length; i++) {
                           let okDiscPromo = true;

                           if (this.promoRules[i].promoDiscounts.length>0) {
                               for (let y = 0; y < this.promoRules[i].promoDiscounts.length; y++) {
                                   okDiscPromo = okDiscPromo && (!!this.promoRules[i].promoDiscounts[y].from && !!this.promoRules[i].promoDiscounts[y].to && !!this.promoRules[i].promoDiscounts[y].disc);
                               }}
                       okPromo = okPromo && okDiscPromo;
                       }
                       return okDisc && okPromo;
                }

        },

        methods : {

            start() {
                this.$store.dispatch('getAllItemNames');
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
                if (!!this.promRules){
                    this.promoRules=[];
                    for (let i = 0; i < this.promRules.length; i++) {
                        let pro = new Promo();
                        pro.fromDate = this.promRules[i].fromDate;
                        pro.toDate = this.promRules[i].toDate;
                        pro.campaign = this.promRules[i].campaign;

                        pro.promoLocations = this.promRules[i].promoLocations;

                        for (let y = 0; y < this.promRules[i].promoDiscounts.length; y++) {
                            let prodis = new Discount();
                            prodis.from = this.promRules[i].promoDiscounts[y].from;
                            prodis.to = this.promRules[i].promoDiscounts[y].to;
                            prodis.disc = this.promRules[i].promoDiscounts[y].disc;
                            pro.promoDiscounts.push(prodis);
                        }
                        this.promoRules.push(pro);
                    }
                } else {this.promoRules=[]}

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

            addDisc(){
                this.discountRules.push(new Discount());
                if (this.discountRules.length>1) {this.discountRules[this.discountRules.length-1].from = this.discountRules[this.discountRules.length-2].to}
            },

            addPromoDisc(index){
                this.promoRules[index].promoDiscounts.push(new Discount());
                if (this.promoRules[index].promoDiscounts.length>1) {
                    this.promoRules[index].promoDiscounts[this.promoRules[index].promoDiscounts.length-1].from = this.promoRules[index].promoDiscounts[this.promoRules[index].promoDiscounts.length-2].to}
            },

            addPromo(){
                this.promoRules.push(new Promo());

            },

            onCancel () {

                this.modal = false;
            },

            onSave () {

               this.$store.dispatch('editDiscountRules',{idUser:this.idUser, idShop:this.idShop ,discountRules:this.discountRules}).then(()=>{
                   this.$store.dispatch('editPromoRules',{idUser:this.idUser, idShop:this.idShop ,promoRules:this.promoRules}).then(()=>{
                       this.refresh();})
               });

                this.modal = false;
            },

        }
    }
</script>

<style scoped>

</style>