<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 justify-center pa-1 >
                <v-card color="teal lighten-4">
                    <v-card-title primary-title >
                        <div class="headline">Users :</div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs12 justify-center pa-1 >
                <v-card
                    v-for="user in curUsersPage"
                    :key="user.id"
                    color="blue lighten-2"

                    >
                    <v-layout mt-2 row wrap justify-space-around>
                        <v-flex xs6 lg3 xl2 mt-2 pb-2   >
                                <v-card-text class="text">{{user.emailBasic}}</v-card-text>
                        </v-flex>
                        <v-flex xs6 lg3 xl2 mt-2 pb-2 >
                            <v-card-text >
                                <div class="text">{{user.firstName}}</div>
                            </v-card-text>
                        </v-flex>
                        <v-flex xs6 lg3 xl2 mt-2 pb-2 >
                            <v-card-text >
                                <div class="text">{{user.lastName}}</div>
                            </v-card-text>
                        </v-flex>
                        <v-flex xs6 lg3 xl2 mt-2 pb-2 >
                            <v-card-text >
                                <div class="text">{{user.phone}}</div>
                            </v-card-text>
                        </v-flex>
                        <v-flex xs12 xl3 ma-2 pa-1 pl-2 align-content-center style="border: 1px black solid">
                            <div >
                             <v-layout row>
                                 <v-flex xs3 mb-2 r>
                                     <v-checkbox
                                             :v-model="user.roles.shopper"
                                             label="Shopper"
                                             color="deep-purple accent-1"
                                             :value="user.roles.shopper"
                                             hide-details
                                             readonly
                                     ></v-checkbox>
                                 </v-flex>
                                 <v-flex xs3 mb-2  >
                                     <v-checkbox
                                             :v-model="user.roles.trader"
                                             label="trader"
                                             color="green accent-3"
                                             :value="user.roles.trader"
                                             hide-details
                                             readonly
                                     ></v-checkbox>
                                 </v-flex>
                                 <v-flex xs3 mb-2 >
                                     <v-checkbox
                                             :v-model="user.roles.buyer"
                                             label="Buyer"
                                             color="yellow accent-2"
                                             :value="user.roles.buyer"
                                             hide-details
                                             readonly
                                     ></v-checkbox>
                                 </v-flex>
                                 <v-flex xs3 mb-2 >
                                     <v-checkbox
                                             :v-model="user.roles.admin"
                                             label="Admin"
                                             color="red"
                                             :value="user.roles.admin"
                                             hide-details
                                             readonly
                                     ></v-checkbox>
                                 </v-flex>
                                 <v-flex  mt-1 mr-2>
                                     <div class="text-xs-center">
                                         <v-menu
                                                 v-model="menu"
                                                 :close-on-content-click="false"
                                                 :close-on-click="false"
                                                 :nudge-width="400"
                                                 left
                                         >
                                             <v-btn
                                                     slot="activator"
                                                     icon
                                                     @click="editRoles"
                                             >
                                                 <v-icon
                                                         :id="user.id"
                                                         color="yellow accent-2"
                                                 >edit
                                                 </v-icon>
                                             </v-btn>

                                             <v-card v-if="!!curRoles && curId===user.id">
                                                     <v-layout row>
                                                         <v-flex xs3 mb-2 r>
                                                             <v-checkbox
                                                                     v-model="curRoles.shopper"
                                                                     label="Shopper"
                                                                     color="deep-purple accent-1"
                                                                     :value="curRoles.shopper"
                                                                     hide-details
                                                             ></v-checkbox>
                                                         </v-flex>
                                                         <v-flex xs3 mb-2  >
                                                             <v-checkbox
                                                                     v-model="curRoles.trader"
                                                                     label="trader"
                                                                     color="green accent-3"
                                                                     :value="curRoles.trader"
                                                                     hide-details
                                                             ></v-checkbox>
                                                         </v-flex>
                                                         <v-flex xs3 mb-2 >
                                                             <v-checkbox
                                                                     v-model="curRoles.buyer"
                                                                     label="Buyer"
                                                                     color="yellow accent-2"
                                                                     :value="curRoles.buyer"
                                                                     hide-details
                                                             ></v-checkbox>
                                                         </v-flex>
                                                         <v-flex xs3 mb-2 >
                                                             <v-checkbox
                                                                     v-model="curRoles.admin"
                                                                     label="Admin"
                                                                     color="red"
                                                                     :value="curRoles.admin"
                                                                     hide-details
                                                             ></v-checkbox>
                                                         </v-flex>
                                                     </v-layout>

                                                 <v-divider></v-divider>

                                                 <v-card-actions>
                                                     <v-spacer></v-spacer>
                                                     <v-btn flat color="grey" @click="menu = false">Cancel</v-btn>
                                                     <v-btn color="primary" flat @click="saveRoles">Save</v-btn>
                                                 </v-card-actions>
                                             </v-card>
                                         </v-menu>
                                     </div>
                                 </v-flex>
                             </v-layout>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
            <v-flex>
              <div class="text-xs-center" v-if="pageNum > 1">
                <v-pagination
                        v-model="curPage"
                         total-visible="pageNum > 5 ? 5 : pageNum"
                        :length="pageNum"
                        @input="getCurUsersPage"
                ></v-pagination>
              </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
        name: "Users",
        computed: {

            ...mapGetters({'allUsersList':'getUsers'}),

            pageNum () { return Math.ceil(this.allUsersList.length/this.itemOnPage)}

        },

        data () { return {
                           curPage : 1,
                           itemOnPage : 10,
                           curUsersPage : [],
                           menu: false,
                           curRoles:null,
                           curId:null
                 }
        },
        created () {
            this.$store.dispatch('loadUsers').then(()=>{this.getCurUsersPage()})
        },
        methods : {
            getCurUsersPage() {
                let start = (this.curPage-1)*this.itemOnPage;
                let end = start + this.itemOnPage;
                end = (end > this.allUsersList.length) ? this.allUsersList.length : end;
                start = start < 0 ? 0 : start;
                let temp = [];
                for (let i=start; i<end; i++) { temp.push(this.allUsersList[i])}
               this.curUsersPage = temp;
            },
            editRoles(event){
                const id = event.target.id;
                const old = this.curUsersPage[this.curUsersPage.findIndex(i=>i.id===id)];
                this.curRoles = JSON.parse(JSON.stringify(old.roles));
                this.curId = id;
            },
            saveRoles(){
                this.menu=false;
                const id = this.curId;
                this.curUsersPage[this.curUsersPage.findIndex(i=>i.id===id)].roles = JSON.parse(JSON.stringify(this.curRoles));
                this.$store.dispatch('saveRoles',{id:id, roles:this.curRoles})
            }
        }
    }
</script>

<style scoped>

</style>