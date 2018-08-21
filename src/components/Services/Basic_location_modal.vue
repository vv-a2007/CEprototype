<template >
    <v-dialog width="50%" v-model="modal" persistent mt3>

             <v-btn icon medium slot="activator"> <v-icon rigth>{{icon}}</v-icon> </v-btn>

        <v-card>
            <v-container>
                <v-layout row >
                    <v-flex xs-10>
                        <v-card-text>
                            <v-autocomplete
                                    v-if="!realLoc"
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
                                    clearable
                                    success
                            ></v-autocomplete>

                            <v-select
                              v-if="arPaths.length>0"
                              v-show="!realLoc"
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
                                    v-if="realLoc"
                                    v-model="realLocStr"
                                    label="Location :"
                                    readonly
                                    :append-icon=" !!realLoc ? 'undo' : ''"
                                    @click:append="delLastItem"
                            ></v-text-field>

                            <v-select
                                    v-if="!!realLoc && arNextItems.length>0"
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
                            <v-text-field
                                    v-model="realLocPost"
                                    :value="realLocPost"
                                    label="Postcode :"
                                    @input="setPost"
                            ></v-text-field>
                            <v-text-field
                                    v-model="realLocAdr"
                                    :value="realLocAdr"
                                    label="Address :"
                                    @input="setAdr"
                            ></v-text-field>

                        </v-card-text>


                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs-10 row>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat class="grey" @click="onCancel">Cancel</v-btn>
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
        name: "BasicLocationModal",
        props: ['idUser', 'idShop', 'id', 'icon', 'addressLine', 'postcode'],
        data() {
            return {
                modal: false,
                allOk: false,
                realLoc: null,
                realLocStr:"",
                realLocAdr:"",
                realLocPost:"",
                model:false,
                modelS:false,
                modelN:false,
                hintS:""
            }
        },
        computed : {
            ...mapGetters({
                           'arNextItems':'getArrayNextItems',
                           'currentSearchBreadcrumbs':'getCurrentSearchBreadcrumbs',
                           'arrayItemNames':'allItemNames'
                          }),

            arPaths () {
                let ar=[];
                for (let i=0; i<this.currentSearchBreadcrumbs.length; i++) {
                    ar[i]={num:i, str:"", lastId:null, listLoc:[]};
                    for (let y=0; y<this.currentSearchBreadcrumbs[i].length; y++) {
                        ar[i].str += this.currentSearchBreadcrumbs[i][y].name + " -> ";
                        ar[i].lastId = this.currentSearchBreadcrumbs[i][y].id;
                        ar[i].listLoc = this.currentSearchBreadcrumbs[i];
                    }
                }
                if (this.currentSearchBreadcrumbs.length>1) {this.hintS="You have more 1 variants"} else {this.hintS="";}

                return ar;
            },


        },

        created () {
            this.$store.dispatch('getAllItemNames');
            if (this.id !== null) {
                 let num = this.$store.getters.getLocateList.findIndex(i=>i.id === this.id);
                 let curLoc = this.$store.getters.getLocateList[num];
                 this.realLoc = curLoc.loc;
                 this.realLocAdr = curLoc.adr;
                 this.realLocStr = curLoc.str;
                 this.realLocPost = curLoc.postcode;
                 this.allOk = (!!((this.addressLine && this.realLocAdr.length > 0) || !this.addressLine)) && (!!((this.postcode && this.realLocPost.length > 0) || !this.postcode));
            }
        },

        updated () {
          if (this.currentSearchBreadcrumbs.length === 1) {
                this.$store.dispatch(('getNextItemSelect'),{lastId:this.arPaths[0].lastId});
                this.realLoc = this.arPaths[0].listLoc;
                this.realLocStr = this.arPaths[0].str;
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
                    this.$store.dispatch('addBasicLocation',{idUser:this.idUser, idShop:this.idShop, loc:this.realLoc, adr:this.realLocAdr, str:this.realLocStr, postcode:this.realLocPost})
                } else {
                    let id = this.idUser;
                    this.$store.dispatch('editBasicLocation',{idUser:this.idUser, id:this.id, loc:this.realLoc, adr:this.realLocAdr, str:this.realLocStr, postcode:this.realLocPost});
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
                    this.realLoc =null; this.realLocStr =""; this.modelN=false; this.modelS=false; this.model=false; this.allOk=false;
                }
            },
            selectPath (value) {
                if (value !== null ) {
                    this.$store.dispatch('getNextItemSelect',{lastId:this.arPaths[value].lastId});
                    this.realLoc = this.arPaths[value].listLoc;
                    this.realLocStr = this.arPaths[value].str;
                    this.allOk = (!!((this.addressLine && this.realLocAdr.length > 0) || !this.addressLine)) && (!!((this.postcode && this.realLocPost.length > 0) || !this.postcode));
                }
                else {this.$store.dispatch('getNextItemSelect',{ lastId:null}); this.realLoc =null; this.realLocStr =""; this.realLocPost =""; this.realLocAdr =""; this.allOk=false }

            },
            selectNext (value) {
                this.realLoc.push({id:value.id, name:value.name});
                this.realLocStr += value.name+' -> ';
                this.$store.dispatch('getNextItemSelect',{lastId:value.id});

            },
            delLastItem () {
                this.realLoc.splice(this.realLoc.length-1,1); this.realLocStr="";
                for (let y=0; y<this.realLoc.length; y++) {this.realLocStr += this.realLoc[y].name+' -> '}
                if (this.realLoc.length === 0) { this.realLoc = null; this.realLocStr = ""; this.modelN=false; this.modelS=false; this.model=false; this.allOk=false;
                                                 this.$store.dispatch('getCurrentBreadcrumbs', { idItem:null, type:'Search'});
                                               }
                  else {this.$store.dispatch('getNextItemSelect', {lastId: this.realLoc[this.realLoc.length - 1].id});}
            },
            setAdr (value) {
                this.allOk = (!!((this.addressLine && value.length > 0) || !this.addressLine)) && (!!((this.postcode && this.realLocPost.length > 0) || !this.postcode));
            },
            setPost (value) {
                this.allOk =(!!((this.addressLine && this.realLocAdr.length > 0) || !this.addressLine)) && (!!((this.postcode && value.length > 0) || !this.postcode));
            }
        }
    }
</script>

<style scoped>

</style>