<template >
    <v-dialog width="100%" v-model="modal" persistent mt-3 @keydown.esc="modal = false">

             <v-btn icon medium slot="activator" @click="start"> <v-icon rigth color="yellow darken-2">{{icon}}</v-icon> </v-btn>

        <v-card>
            <v-container fluid>
                <v-layout row v-if="shop.id !== null">
                    <v-flex xs-12 >
                        <v-card>
                            <v-layout row wrap fill-height>
                                <v-flex lg1 class="text-xs-center"  pl-3 pr-2 fill-height>
                                    <v-avatar
                                            slot="activator"
                                            size="100%"
                                            tile>
                                        <img
                                                v-if="!!shop.logoSrc"
                                                :src="shop.logoSrc"
                                                alt="logo">
                                        <v-icon
                                                v-else
                                                color="yellow"
                                                @click="addLogo"
                                        >add_photo_alternate</v-icon>
                                    </v-avatar>
                                    <input ref="fileInput"
                                           type="file"
                                           style="display: none;"
                                           accept="image/*"
                                           @change="onFileChange"
                                    >
                                </v-flex>

                                <v-flex xs6 md4 lg3  fill-height pr-2>
                                    <div style="border: black thin solid" >
                                        <v-layout row no-wrap fill-height>
                                            <v-flex xs2 fill-height >
                                                <v-card-title style="color: black" class=" font-weight-bold ">Shop name:</v-card-title>
                                            </v-flex>
                                            <v-flex xs10 fill-height pt-1>
                                                 <v-text-field  type="text"  flat hide-details solo :value="shop.name" v-model="shop.name" >
                                                  {{shop.name}}
                                                 </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </div>
                                </v-flex>

                                <v-flex xs6 md4 lg1 class="text-xs-center " fill-height>
                                    <div style="border: black thin solid" >
                                        <v-layout row no-wrap fill-height>
                                          <v-flex fill-height pt-1>
                                             <v-select :items="currenciesList" item-value="id" item-text="currName" v-model="shop.currency" clearable return-object hide-details solo placeholder="set currency"></v-select>
                                          </v-flex>
                                        </v-layout>
                                    </div>
                                </v-flex>

                                <v-flex xs8 md6 lg4 class="text-xs-center " fill-height pl-2>
                                    <div style="border: black thin solid">
                                        <v-layout row wrap fill-height>
                                        <v-flex fill-height >
                                                <v-card-title style="color: blue" class=" font-weight-bold justify-center">Location : </v-card-title>
                                            </v-flex>
                                        <v-flex pl-1 fill-height>
                                             <v-card-text type="text"  :value="modelLoc" v-model="modelLoc" >
                                             {{modelLoc}}
                                             </v-card-text>
                                        </v-flex>
                                        <v-flex pl-1 fill-height >
                                            <basic-location-modal
                                                :id-user="idUser"
                                                :id-shop="shop.id"
                                                :location="shop.basicLocation"
                                                 icon="edit"
                                                 address-line="true"
                                                 postcode="true"
                                                :refresh="start"
                                            >
                                            </basic-location-modal>
                                        </v-flex>
                                        </v-layout>
                                    </div>
                                </v-flex>

                                <v-flex xs4 md4 lg2 class="text-xs-center " fill-height pl-2>
                                    <div style="border: black thin solid">
                                        <v-layout row fill-height no-wrap >
                                            <v-flex xs5 fill-height no-wrap>
                                             <v-card-title class="red--text font-weight-bold justify-center">Discount rules :</v-card-title>
                                            </v-flex>
                                            <v-flex xs5 fill-height no-wrap>
                                             <v-card-text class="font-weight-bold justify-center">Max {{this.maxDiscount}} %</v-card-text>
                                            </v-flex>
                                            <v-flex xs2 fill-height>
                                             <discount-rules-modal
                                                :id-user="idUser"
                                                :id-shop="shop.id"
                                                icon="edit"
                                                :refresh="start"
                                             >
                                             </discount-rules-modal>
                                            </v-flex>
                                        </v-layout>
                                    </div>
                                </v-flex>

                                <v-flex xs4 md4 lg1 class="text-xs-center " fill-height pl-2>
                                <div style="border: black thin solid">
                                    <v-layout row fill-height no-wrap>
                                        <v-flex fill-height no-wrap>
                                            <v-card-title class="blue-grey--text font-weight-bold justify-center">Delivery price:</v-card-title>
                                        </v-flex>
                                        <delivery-zones-modal
                                                :id-user="idUser"
                                                :id-shop="shop.id"
                                                icon="edit"
                                                :refresh="start"
                                        >
                                        </delivery-zones-modal>
                                    </v-layout>
                                </div>
                                </v-flex>

                            </v-layout>

                            <v-layout row wrap fill-height>
                                <v-flex xs12 md8 lg5 fill-height my-3 pl-3>
                                    <div style="border: black thin solid">
                                        <v-layout row fill-height >
                                            <v-textarea label="Short description" :value="shop.shortDescription" v-model="shop.shortDescription" hide-details>
                                               {{shop.shortDescription}}
                                            </v-textarea>
                                        </v-layout>
                                    </div>
                                </v-flex>
                            </v-layout>

                            <v-divider></v-divider>
                            <v-layout fill-height>
                                <v-flex xs-10 row mt-3 fill-height>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn flat class="grey" @click="onCancel">Cancel</v-btn>
                                        <v-btn class="success" @click="onSave">Save</v-btn>
                                    </v-card-actions>
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import  BasicLocationModal from '../Services/Basic_location_modal'
import  DiscountRulesModal from '../Services/Discount_rules_modal'
import  DeliveryZonesModal from './Delivery_zones_modal'

export default {

    name: "ShopModal",

    components:{BasicLocationModal, DiscountRulesModal, DeliveryZonesModal},

    props: ['idUser', 'id', 'icon'],

        data() {
            return {
                modal: false,
                shop:{
                    id:this.id,
                    logo:null,
                    logoSrc:"",
                    name:"",
                    currency :null,
                    basicLocation: {str:"", loc:null, adr:"", postcode:""},
                    logoImageSrc:null,
                    shortDescription:"",
                    discountRules:[],
                    deliveryZones:null,
                    parselRules:null,
                    buyersList:[]
                }

            }
        },
        computed : {
            ...mapGetters({
                            'tradersShops':'tradersShops',
                            'currenciesList':'currenciesList'
                          }),
             modelLoc () {if (!!this.shop.basicLocation){ return this.shop.basicLocation.str+' ( '+this.shop.basicLocation.postcode+'  '+this.shop.basicLocation.adr+' )'} else {return ""}},
             maxDiscount () {
                 let max = 0;
                 for (let i = 0; i < this.shop.discountRules.length; i++) {
                     if (Number.parseInt(this.shop.discountRules[i].disc) > max) {
                         max = Number.parseInt(this.shop.discountRules[i].disc)
                     }
                 }
                 return max.toString()
             }
        },

        mounted () {

        },

        updated () {
              this.start()
        },


        methods : {

            start(){
                if (this.id !== null) {
                    this.shop = this.$store.getters.getShop(this.id);
                }
            },

            addLogo(){
                this.$refs.fileInput.click();
            },

            onFileChange (event) {
                const file = event.target.files[0];
                const reader = new FileReader();

     //           reader.onload = e => {
     //               this.shop.logoSrc = reader.result
     //           };
                reader.readAsDataURL(file);
                this.shop.logo = file;
            },

            onCancel(){ this.modal = false},

            onSave(){ this.$store.dispatch('editShop', {
                idUser:this.idUser, shop:this.shop}).then(()=>{this.$store.dispatch('getTradersShops', {idUser:this.idUser});});
                this.modal=false;
            }
        }
    }
</script>

<style scoped>

</style>