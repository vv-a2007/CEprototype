<template>
    <v-container>

        <v-layout row wrap>
            <v-flex xs12>
                <h1 class="text-xs-center" >My shops list:</h1>
            </v-flex>
        </v-layout>

        <v-layout row wrap v-if="!!tradersShops">
         <v-flex lg12 >
           <v-card v-for="shop in tradersShops" :key="shop.id">
            <div style="border: black thin solid">
            <v-layout row wrap>
             <v-flex lg4 my-1>
                <v-text-field type="text" solo hide-details flat readonly :value="shop.name" v-model="shop.name">
                    {{shop.name}}
                </v-text-field>
             </v-flex>
             <v-flex lg5 my-1>
                <v-text-field type="text" solo hide-details flat readonly :value="shop.shortDescription" v-model="shop.shortDescription">
                    {{shop.shortDescription}}
                </v-text-field>
             </v-flex>
             <v-flex my-1>
                <shop-modal
                        :id-user="idUser"
                        :id="shop.id"
                        icon="edit"
                >
                </shop-modal>
             </v-flex>
             <v-spacer></v-spacer>
            </v-layout>
            </div>
           </v-card>
         </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12>
                <div class="text-xs-center">
                    <v-menu
                            v-model="menu"
                            :close-on-content-click=false
                            :close-on-click=false
                            min-width="400px"
                            left
                    >
                        <v-btn
                                slot="activator"
                                icon
                                @click=""
                        >
                            <v-icon
                                    color="green"
                            >add_box
                            </v-icon>
                        </v-btn>

                        <v-card>
                            <v-layout row>
                                <v-text-field type="text" solo :value="newShop" v-model="newShop">
                                    {{newShop}}
                                </v-text-field>
                            </v-layout>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat color="grey" @click="menu = false">Cancel</v-btn>
                                <v-btn  color="success"  @click="addShop">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>
                </div>






            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex';

    import  ShopModal from './Services/Shop_modal'

    export default {

        name: "Trading",

        components:{ShopModal},

        computed: {
            ...mapGetters({
                'idUser':'userId',
                'tradersShops':'tradersShops'
            }),
        },
        created () {
            this.$store.dispatch('getTradersShops', {idUser:this.idUser});
            this.$store.dispatch('getCurrenciesList');
        },
        updated () {

        },
        data () {
            return {
                  menu:false,
                  newShop:""
            }
        },
        methods : {
            addShop (){
                this.$store.dispatch('addShop', { name:this.newShop, idUser:this.idUser}).then(()=>{this.newShop = ""; this.menu = false; this.$store.dispatch('getTradersShops', {idUser:this.idUser});})
            }
        }
    }
</script>

<style scoped>

</style>