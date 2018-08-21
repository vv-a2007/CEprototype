<template>
        <v-container>
            <v-layout row >
                <v-flex xs12 justify-center wrap >
                    <h1 class="text--headline mb5 text-xs-center ">Currencies</h1>
                </v-flex>
            </v-layout>

        <v-spacer></v-spacer>

            <v-layout row wrap v-if="!!currenciesList" align-center justify-center >
                <v-flex xs12 v-for="curr in currenciesList" :key="curr.id">
                    <v-card >
                       <v-layout row wrap>
                        <v-flex lg1 align-center justify-center>
                                <v-icon >{{curr.iconName}}</v-icon>
                        </v-flex>
                        <v-flex lg2>
                          <v-card-text>
                            <v-text-field type="text" solo v-model="curr.currName" readonly :name="curr.currName">{{curr.currName}}</v-text-field>
                          </v-card-text>
                        </v-flex>
                        <v-flex lg1>
                          <v-card-text>
                            <v-text-field type="text" solo v-model="curr.currCode" readonly :name="curr.currCode">{{curr.currCode}}</v-text-field>
                          </v-card-text>
                        </v-flex>
                        <v-flex lg1>
                          <v-card-actions><v-icon :id="curr.id" @click="delCurr" color="red">delete_outline</v-icon></v-card-actions>
                        </v-flex>
                       </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card>
                     <v-layout row wrap>
                       <v-flex lg3>
                        <v-card-text
                        ><v-text-field label="currency icon name" v-model="newCurr.iconName" :name="newCurr.iconName">{{newCurr.iconName}}</v-text-field>
                        </v-card-text>
                       </v-flex>
                       <v-flex lg1>
                        <v-icon v-model="newCurr.iconName">{{newCurr.iconName}}</v-icon>
                       </v-flex>
                       <v-flex lg3>
                        <v-card-text>
                            <v-text-field label="currency name" v-model="newCurr.currName" :name="newCurr.currName">{{newCurr.currName}}</v-text-field>
                        </v-card-text>
                       </v-flex>
                       <v-flex lg2>
                        <v-card-text>
                            <v-text-field label="currency code" v-model="newCurr.currCode" :name="newCurr.currCode">{{newCurr.currCode}}</v-text-field>
                        </v-card-text>
                       </v-flex>
                       <v-flex lg3>
                        <v-card-actions style="justify-content:center; align-items:center ">
                                <v-btn large class="success text-xs-center" @click="addCurr"> ADD NEW CURRENCY</v-btn>
                        </v-card-actions>
                       </v-flex>
                     </v-layout>
                    </v-card>
                </v-flex>

            </v-layout>
        </v-container>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "Currencies",
        computed : {
            ...mapGetters({
                'currenciesList':'currenciesList'
            }),
        },

        data() {
            return {
                newCurr:{
                    id:null,
                    iconName:"",
                    currName:"",
                    currCode:""
                }
            }
        },
        created() {
            this.$store.dispatch('getCurrenciesList');
        },
        methods : {
            addCurr(){
                this.$store.dispatch('addCurrency', this.newCurr);
                this.newCurr = {id:null, iconName:"", currName:"", currCode:""}
            },
            delCurr(event){
                this.$store.dispatch('delCurrency', event.target.id).then(()=>{
                    this.$store.dispatch('getCurrenciesList')
                })

            }
        }
    }
</script>

<style scoped>

</style>