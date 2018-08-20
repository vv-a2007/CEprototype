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
                    v-for="user in this.curUsersPage"
                    :key=user.id
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
                                             v-model="user.roles['shopper']"
                                             label="Shopper"
                                             color="deep-purple accent-1"
                                             :input-value="user.roles['shopper']"
                                             value
                                             hide-details
                                             readonly
                                     ></v-checkbox>
                                 </v-flex>
                                 <v-flex xs3 mb-2  >
                                     <v-checkbox
                                             v-model="user.roles['trader']"
                                             label="Trader"
                                             color="green accent-3"
                                             :input-value="user.roles['trader']"
                                             value
                                             hide-details
                                             readonly
                                     ></v-checkbox>
                                 </v-flex>
                                 <v-flex xs3 mb-2 >
                                     <v-checkbox
                                             v-model="user.roles['buyer']"
                                             label="Buyer"
                                             color="yellow accent-2"
                                             :input-value="user.roles['buyer']"
                                             value
                                             hide-details
                                             readonly
                                     ></v-checkbox>
                                 </v-flex>
                                 <v-flex xs3 mb-2 >
                                     <v-checkbox
                                             v-model="user.roles['admin']"
                                             label="Admin"
                                             color="red"
                                             :input-value="user.roles['admin']"
                                             value
                                             hide-details
                                             readonly
                                     ></v-checkbox>
                                 </v-flex>
                                 <v-flex  mt-1 mr-2>
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
                                                     @click="editRoles"
                                             >
                                                 <v-icon
                                                         color="yellow accent-2"
                                                         :id="user.id"
                                                 >edit
                                                 </v-icon>
                                             </v-btn>

                                             <v-card v-if="!!curRoles && curId===user.id">
                                                     <v-layout row>
                                                         <v-flex xs3 mb-2>
                                                             <v-checkbox
                                                                     v-model="curRoles['shopper']"
                                                                     label="Shopper"
                                                                     color="deep-purple accent-1"
                                                                     :input-value="curRoles['shopper']"
                                                                     value
                                                                     hide-details

                                                             ></v-checkbox>
                                                         </v-flex>
                                                         <v-flex xs3 mb-2>
                                                             <v-checkbox
                                                                     v-model="curRoles['trader']"
                                                                     label="Trader"
                                                                     color="green accent-3"
                                                                     :input-value="curRoles['trader']"
                                                                     value
                                                                     hide-details
                                                             ></v-checkbox>
                                                         </v-flex>
                                                         <v-flex xs3 mb-2>
                                                             <v-checkbox
                                                                     v-model="curRoles['buyer']"
                                                                     label="Buyer"
                                                                     color="yellow accent-2"
                                                                     :input-value="curRoles['buyer']"
                                                                     value
                                                                     hide-details
                                                             ></v-checkbox>
                                                         </v-flex>
                                                         <v-flex xs3 mb-2>
                                                             <v-checkbox
                                                                     v-model="curRoles['admin']"
                                                                     label="Admin"
                                                                     color="red"
                                                                     :input-value="curRoles['admin']"
                                                                     value
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
                        @input=""
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

            pageNum () { return Math.ceil(this.allUsersList.length/this.itemOnPage)},
            curUsersPage() {
                let start = (this.curPage-1)*this.itemOnPage;
                let end = start + this.itemOnPage;
                end = (end > this.allUsersList.length) ? this.allUsersList.length : end;
                start = start < 0 ? 0 : start;
                let temp = [];
                for (let i=start; i<end; i++) { temp.push( JSON.parse(JSON.stringify(this.allUsersList[i])))}
                return temp;
            },

        },

        data () { return {
                           curPage : 1,
                           itemOnPage : 10,
                           menu: false,
                           curRoles:{},
                           curId:null
                 }
        },
        created () {
            this.$store.dispatch('loadUsers');
        },
        methods : {

            editRoles(event){
                const id = event.target.id;
                const old = this.curUsersPage[this.curUsersPage.findIndex(i=>i.id===id)];
                this.curRoles['admin'] = old.roles['admin'];
                this.curRoles['shopper'] = old.roles['shopper'];
                this.curRoles['trader'] = old.roles['trader'];
                this.curRoles['buyer'] = old.roles['buyer'];
                this.curId = id;
            },
            saveRoles(){
                const id = this.curId;
                this.curUsersPage[this.curUsersPage.findIndex(i=>i.id===id)].roles['admin'] = this.curRoles['admin'];
                this.curUsersPage[this.curUsersPage.findIndex(i=>i.id===id)].roles['shopper'] = this.curRoles['shopper'];
                this.curUsersPage[this.curUsersPage.findIndex(i=>i.id===id)].roles['trader'] = this.curRoles['trader'];
                this.curUsersPage[this.curUsersPage.findIndex(i=>i.id===id)].roles['buyer'] = this.curRoles['buyer'];
                this.$store.dispatch('saveRoles',{'id':id, 'roles':this.curRoles}).then(()=>{
                    this.curRoles={};
                    this.curId=null;
                    this.menu=false;
                })

            }
        }
    }
</script>

<style scoped>

</style>