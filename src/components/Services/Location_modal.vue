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
                                    v-if="arNextItems.length>0"
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
                            <v-btn v-if="!isDefault" flat class="orange" @click="setDefault" :disabled="!allOk">Set default</v-btn>
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
        name: "LocationModal",
        props: ['idUser', 'id', 'icon', 'addressLine', 'postcode'],
        data() {
            return {
                modal: false,
                allOk: false,
                arPaths:[],
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

            arrayItemNames () {return this.$store.getters.allItemNames;},
            currentSearchBreadcrumbs () {return this.$store.getters.getCurrentSearchBreadcrumbs},
            arNextItems () { return this.$store.getters.getArrayNextItems},
            ...mapGetters({'defaultLocation' : 'getDefaultLocation'}),
            isDefault () {return this.defaultLocation === this.id}
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
                 this.getArPaths();
            }
        },


        methods : {
            getArPaths () {
                this.arPaths=[];
                for (let i=0; i<this.currentSearchBreadcrumbs.length; i++) {
                    this.arPaths[i]={num:i, str:"", lastId:null, listLoc:[]};
                    for (let y=0; y<this.currentSearchBreadcrumbs[i].length; y++) {
                        this.arPaths[i].str += this.currentSearchBreadcrumbs[i][y].name + " -> ";
                        this.arPaths[i].lastId = this.currentSearchBreadcrumbs[i][y].id;
                        this.arPaths[i].listLoc = this.currentSearchBreadcrumbs[i];
                    }
                }
                if (this.currentSearchBreadcrumbs.length>1) {this.hintS="You have more 1 variants"}
                else {
                    this.hintS="";
                    if (this.currentSearchBreadcrumbs.length === 1) {this.selectPath(0)}
                }
            },
            onCancel () {
                this.model = false;
                this.modelS = false;
                this.$store.dispatch('getCurrentBreadcrumbs', { idItem:null, type:'Search'});

                this.modal = false;
            },
            onSave () {
                if (this.id === null) {
                    this.$store.dispatch('addLocation',{idUser:this.idUser, loc:this.realLoc, adr:this.realLocAdr, str:this.realLocStr, postcode:this.realLocPost})
                } else {
                    let id = this.idUser;
                    this.$store.dispatch('editLocation',{idUser:this.idUser, id:this.id, loc:this.realLoc, adr:this.realLocAdr, str:this.realLocStr, postcode:this.realLocPost}).
                      then(()=>{this.$store.dispatch('getDeliveryLoc', {idUser: id})})
                }

                this.model = false;
                this.modelS = false;
                this.$store.dispatch('getCurrentBreadcrumbs', { idItem:null, type:'Search'});

                this.modal = false;
            },
            searchLoc (item) {
                if (item !== null && item.id !== null) {
                    this.$store.dispatch('getCurrentBreadcrumbs', { idItem:item.id, type:'Search'}).then(()=>{ this.getArPaths();})

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
                this.$store.dispatch('getNextItemSelect',{lastId:value.id}).then(()=>{ this.getArPaths();})

            },
            delLastItem () {
                this.realLoc.splice(this.realLoc.length-1,1); this.realLocStr="";
                for (let y=0; y<this.realLoc.length; y++) {this.realLocStr += this.realLoc[y].name+' -> '}
                if (this.realLoc.length === 0) { this.realLoc = null; this.realLocStr = ""; this.modelN=false; this.modelS=false; this.model=false; this.allOk=false;
                                                 this.$store.dispatch('getCurrentBreadcrumbs', { idItem:null, type:'Search'}); this.arPaths=[];
                                               }
                  else {
                    this.$store.dispatch('getNextItemSelect',{lastId:this.realLoc[this.realLoc.length-1].id}).
                    then(()=>{ this.getArPaths();})}
            },
            setAdr (value) {
                this.allOk = (!!((this.addressLine && value.length > 0) || !this.addressLine)) && (!!((this.postcode && this.realLocPost.length > 0) || !this.postcode));
            },
            setPost (value) {
                this.allOk =(!!((this.addressLine && this.realLocAdr.length > 0) || !this.addressLine)) && (!!((this.postcode && value.length > 0) || !this.postcode));
            },
            setDefault() {
                this.$store.dispatch('setDefaultLoc',{id:this.id, userId:this.idUser})
            }
        }
    }
</script>

<style scoped>

</style>