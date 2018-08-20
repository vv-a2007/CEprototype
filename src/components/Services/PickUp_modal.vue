<template >
    <v-dialog width="50%" v-model="modal" persistent mt3>

             <v-btn icon medium slot="activator"> <v-icon rigth>{{icon}}</v-icon> </v-btn>

        <v-card>
            <v-container>
                <v-layout row >
                    <v-flex xs-10>
                        <v-card-text>
                            <v-autocomplete
                                    v-if="!realPickUp"
                                    v-model="model"
                                    :items="arrayItemNames"
                                    color="blue"
                                    return-object
                                    item-text="name"
                                    item-value="id"
                                    id="id"
                                    label="Search locations"
                                    @change='searchLoc'
                                    placeholder="Enter any part of your location"
                                    prepend-inner-icon="youtube_searched_for"
                                    autofocus
                                    clearable
                            ></v-autocomplete>

                            <v-select
                              v-if="arPaths.length>0"
                              v-show="!realPickUp"
                              :items="arPaths"
                              item-value="num"
                              item-text="str"
                              :v-model="modelS"
                              :value="modelS"
                              readonly
                              small
                              solo
                              @change="selectPath"
                              label="Select variant of location"
                              persistent-hint
                              :hint="hintS"
                              clearable
                          >
                          </v-select>

                            <v-text-field
                                    v-if="realPickUp"
                                    v-model="realPickUpStr"
                                    label="Location :"
                                    readonly
                                    :append-icon=" !!realPickUp ? 'undo' : ''"
                                    @click:append="delLastItem"
                            ></v-text-field>

                            <v-select
                                    v-if="!!realPickUp && arNextItems.length>0"
                                    :items="arNextItems"
                                    item-value="id"
                                    item-text="name"
                                    :v-model="modelN"
                                    :value="modelN"
                                    return-object
                                    readonly
                                    small
                                    solo
                                    @change="selectNext"
                                    label="Select detail"
                            >
                            </v-select>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs-10 row>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat  @click="onCancel">Cancel</v-btn>
                            <v-btn flat class="success" @click="onSave" :disabled="!allOk">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
        name: "PickUpModal",
        props: ['idUser', 'id', 'icon'],
        data() {
            return {
                modal: false,
                allOk: false,
                realPickUp: null,
                realPickUpStr:"",
                model:false,
                modelS:false,
                modelN:false,
                hintS:""
            }
        },
        computed : {
            ...mapGetters({
                'arrayItemNames':'allItemNames',
                'currentSearchBreadcrumbs':'getCurrentSearchBreadcrumbs',
                'arNextItems':'getArrayNextItems'
            }),

            arPaths () {
                let ar=[];
                for (let i=0; i<this.currentSearchBreadcrumbs.length; i++) {
                    ar[i]={num:i, str:"", lastId:null, listLoc:[]};
                    for (let y=0; y<this.currentSearchBreadcrumbs[i].length; y++) {
                        ar[i].str += this.currentSearchBreadcrumbs[i][y].name + " -> ";
                        ar[i].lastId = this.currentSearchBreadcrumbs[i][y].id;
                        ar[i].listPickUp = this.currentSearchBreadcrumbs[i];
                    }
                }
                if (this.currentSearchBreadcrumbs.length>1) {this.hintS="You have more 1 variants"} else { this.hintS=""}

                return ar;
            },


        },

        created () {
            this.$store.dispatch('getAllItemNames');
            if (this.id !== null) {
                 let num = this.$store.getters.getPickUpList.findIndex(i=>i.id === this.id);
                 let curLoc = this.$store.getters.getPickUpList[num];
                 this.realPickUp = curLoc.loc;
                 this.realPickUpStr = curLoc.str;
                 this.allOk = true;
            }
        },

        updated () {
            if (this.currentSearchBreadcrumbs.length === 1) {
                this.$store.dispatch(('getNextItemSelect'),{lastId:this.arPaths[0].lastId});
                this.realPickUp = this.arPaths[0].listPickUp;
                this.realPickUpStr = this.arPaths[0].str;
                this.allOk = true;
            }
        },

        methods : {
            onCancel () {
                this.model = false;
                this.modelS = false;
                this.modelN=false;
                this.$store.dispatch('getCurrentBreadcrumbs', { idItem:null, type:'Search'});

                this.modal = false;
            },
            onSave () {
                if (this.id === null) {
                    this.$store.dispatch('addPickUp',{idUser:this.idUser, loc:this.realPickUp, str:this.realPickUpStr})
                } else {
                    let id = this.idUser;
                    this.$store.dispatch('editPickUp',{idUser:this.idUser, id:this.id, loc:this.realPickUp, str:this.realPickUpStr}).
                      then(()=>{this.$store.dispatch('getPickUp', {idUser: id})})
                }

                this.model = false;
                this.modelS = false;
                this.modelN=false;
                this.$store.dispatch('getCurrentBreadcrumbs', { idItem:null, type:'Search'});

                this.modal = false;
            },
            searchLoc (item) {
                if (item !== null && item.id !== null) {
                    this.$store.dispatch('getCurrentBreadcrumbs', { idItem:item.id, type:'Search'});

                } else {
                    this.$store.dispatch('getCurrentBreadcrumbs', { idItem:null, type:'Search'});
                    this.realPickUp =null; this.realPickUpStr =""
                }
            },
            selectPath (value) {
                if (value !== null ) {
                    this.$store.dispatch(('getNextItemSelect'),{lastId:this.arPaths[value].lastId});
                    this.realPickUp = this.arPaths[value].listPickUp;
                    this.realPickUpStr = this.arPaths[value].str;
                    this.allOk = true;
                }
                else {this.$store.dispatch(('getNextItemSelect'),{ lastId:null}); this.realPickUp =null; this.realPickUpStr =""; this.allOk=false }

            },
            selectNext (value) {
                this.realPickUp.push({id:value.id, name:value.name});
                this.realPickUpStr += value.name+' -> ';
                this.$store.dispatch(('getNextItemSelect'),{lastId:value.id});
            },
            delLastItem () {
                this.realPickUp.splice(this.realPickUp.length-1,1); this.realPickUpStr="";
                for (let y=0; y<this.realPickUp.length; y++) {this.realPickUpStr += this.realPickUp[y].name+' -> '}
                if (this.realPickUp.length === 0) { this.realPickUp = null; this.modelN=false; this.modelS=false; this.model=false; this.allOk=false;
                                                 this.$store.dispatch('getCurrentBreadcrumbs', { idItem:null, type:'Search'});
                                               }
                  else {this.$store.dispatch(('getNextItemSelect'),{lastId:this.realPickUp[this.realPickUp.length-1].id})}
            }
        }
    }
</script>

<style scoped>

</style>