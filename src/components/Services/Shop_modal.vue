<template >
    <v-dialog width="90%" v-model="modal" persistent mt3>

             <v-btn icon medium slot="activator" @click="start"> <v-icon rigth>{{icon}}</v-icon> </v-btn>

        <v-card>
            <v-container>
                <v-layout row v-if="shop.id !== null">
                    <v-flex xs-11>
                        <v-card>
                            <v-layout row wrap>
                                <v-flex lg3>
                                    <v-text-field type="text" label="shop name" :value="shop.name" v-model="shop.name">
                                        {{shop.name}}
                                    </v-text-field>
                                </v-flex>
                                <v-flex lg1>
                                    <v-select label="Shop currency" :items="currenciesList" item-value="id" item-text="currName" v-model="shop.currency" clearable return-object ></v-select>
                                </v-flex>
                                <v-flex lg5 >
                                    <v-text-field type="text" label="Basic location" :value="modelLoc" v-model="modelLoc" readonly hide-details>
                                             {{modelLoc}}
                                    </v-text-field>
                                </v-flex>
                                <v-flex lg1 >
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
                            <v-layout row wrap>
                                <v-flex lg6>
                                    <v-textarea label="Short description" :value="shop.shortDescription" v-model="shop.shortDescription">
                                        {{shop.shortDescription}}
                                    </v-textarea>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-layout>
                                <v-flex xs-10 row>
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

export default {

    name: "ShopModal",

    components:{BasicLocationModal},

    props: ['idUser', 'id', 'icon'],

        data() {
            return {
                modal: false,
                shop:{
                    id:this.id,
                    name:"",
                    currency :null,
                    basicLocation: {str:"", loc:null, adr:"", postcode:""},
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
                            'tradersShops':'tradersShops',
                            'currenciesList':'currenciesList'
                          }),
             modelLoc () {if (!!this.shop.basicLocation){ return this.shop.basicLocation.str+' ( '+this.shop.basicLocation.postcode+'  '+this.shop.basicLocation.adr+' )'} else {return ""}}

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