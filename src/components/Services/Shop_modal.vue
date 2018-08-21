<template >
    <v-dialog width="90%" v-model="modal" persistent mt3>

             <v-btn icon medium slot="activator"> <v-icon rigth>{{icon}}</v-icon> </v-btn>

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
                                <v-flex lg3>
                                    <v-select label="Sale currency" v-model="currenciesList" :value="shop.currency"></v-select>
                                </v-flex>
                                <v-flex lg3 >
                                    <v-text-field type="text" label="basic location" :value="shop.basicLocation" >
                                        {{shop.basicLocation}}
                                    </v-text-field>
                                    <basic-location-modal
                                            :id-user="this.idUser"
                                            :id-shop="shop.id"
                                            :id="shop.basicLocation"
                                            icon="..."
                                            :address-line="true"
                                            :postcode="true"
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
                            'tradersShops':'tradersShops',
                            'currenciesList':'currenciesList'
                          }),


        },

        created () {
            if (this.id !== null) {
                 let shopTemp = this.$store.getters.getShop(this.id);
                 this.shop.name = shopTemp.name;
                this.shop.shortDescription = shopTemp.shortDescription;
            }
        },

        updated () {

        },



        methods : {
            onCancel(){ this.modal = false},
            onSave(){ this.$store.dispatch('editShop', {
                idUser:this.idUser, shop:this.shop});
                this.modal=false;
            }
        }
    }
</script>

<style scoped>

</style>