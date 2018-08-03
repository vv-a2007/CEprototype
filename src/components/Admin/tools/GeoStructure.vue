<template>
    <v-container>

         <v-layout>
            <v-flex row>
                <h2>Geostructure</h2>
            </v-flex>
         </v-layout>
        <v-container>
         <v-layout row justify-space-between m-5>
            <v-flex xs3 >
                <v-card>
                    <v-card-text>
                        <v-layout row wrap justify-space-between  >
                            <v-flex xs12>
                                <h3>Geotypes</h3>
                            </v-flex>
                          <v-flex xs12>
                           <v-list >
                            <v-list-tile
                              v-for="geoType in geoTypes"
                              :key="geoType.id"
                              @click="selectGeo(geoType.id)"
                      >
                              <v-list-tile-content>
                                <v-list-tile-title v-if="curGeoName === geoType.geoname" style="color:blue" >{{ geoType.geoname }}</v-list-tile-title>
                                <v-list-tile-title v-else >{{ geoType.geoname }}</v-list-tile-title>
                              </v-list-tile-content>

                              <v-list-tile-action>
                                  <v-btn icon ripple>
                                     <v-icon color="grey darken-2"  @click.stop="delGeo(geoType.id)" v-if="curGeoName === geoType.geoname">backspace</v-icon>
                                      <v-icon color="grey lighten-1"  @click.stop="" v-else :disabled="true">backspace</v-icon>
                                  </v-btn>
                               </v-list-tile-action>
                             </v-list-tile>
                           </v-list>
                          </v-flex>

                           <v-form v-model="valid" ref="form" lazy-validation prevent>
                                <v-flex xs12 justify-space-between ml-2>
                                  <v-text-field
                                     type="text"
                                     v-model="newGeo"
                                     :rules="geoRules"
                                     placeholder="Enter new Geo type"
                                  ></v-text-field>
                                </v-flex>
                                  <v-flex xs12>
                                     <v-btn class="success" @click="newGeoType" :disabled="!valid">Add new</v-btn>
                                  </v-flex>

                        </v-form>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-spacer></v-spacer>

            <v-flex row xs8 justify-space-between v-show="this.curGeoId">
                <v-card>
                    <v-card-text>
                    <v-layout row wrap justify-space-between  >
                        <v-flex xs6 d-flex>
                            <div >
                                <h3>Geo type</h3>
                                <v-text-field
                                        v-model="curGeoName"
                                        solo
                                ></v-text-field>
                            </div>
                        </v-flex>
                        <v-flex xs6 d-flex>
                            <div>
                              <h3>Default Geo children</h3>
                                <v-select ml-3
                                    :items="geoTypes"
                                    item-value="id"
                                    item-text="geoname"
                                    solo
                                    v-model="defaultChildId"
                                    @change="setDefChild"
                                    autofocus
                                  ></v-select>
                            </div>
                        </v-flex>

                        <v-flex xs12><h3>Custom Geo Children</h3></v-flex>
                        <v-flex xs12 d-flex justify-space-between ml-3
                                v-for="item in customChildren"
                                :key="item.id"
                                @click=""
                            >
                            <v-flex xs5>
                            <p >{{item.custValue}}</p>
                            </v-flex>
                            <v-flex xs5>
                            <p>{{item.custChild}}</p>
                            </v-flex>
                            <v-flex xs2>
                            <v-btn icon ripple>
                                       <v-icon color="grey lighten-1"  @click="delCustomChild(item.id)">backspace</v-icon>
                                      </v-btn>
                            </v-flex>
                        </v-flex>
                    </v-layout>

                        <v-spacer></v-spacer>

                     <v-form v-model="valid1" ref="form1" lazy-validation>
                         <v-layout row justify-space-between>
                           <v-flex xs5>
                              <div>
                                <v-select
                                        :items="curGeoValues"
                                        item-value="id"
                                        item-text="name"
                                        v-model="curCustValue"
                                        :rules="geoRules"
                                        solo
                                        label="For custom value"
                                ></v-select>
                              </div>
                           </v-flex>
                           <v-flex xs5 >
                                <v-select ml-3
                                        :items="geoTypes"
                                        item-value="id"
                                        item-text="geoname"
                                        v-model="newCustChildId"
                                        :rules="geoRules"
                                        solo
                                        label="Custom child"
                                ></v-select>
                           </v-flex>
                             <v-flex xs2 >
                                <v-btn ml-3 class="success" @click="addCustChild" :disabled="!valid1">Add</v-btn>
                             </v-flex>
                      </v-layout>
                     </v-form>
                    </v-card-text>
                </v-card>
              </v-flex>
        </v-layout>
    </v-container>
     <v-container v-show="this.curGeoId">
        <v-layout row  >
            <v-flex xs12 >
                <v-card>
                    <v-card-text>
                        <h3>Geo values for : {{curGeoName}}</h3>
                        <v-container  grid-list-xs>
                            <v-layout row wrap >
                                <v-flex xs6 sm4 md2 lg1 v-for="val in this.curGeoValues" :key="val.name">

                                        <v-badge rigth color="yellow" v-model="val.name === defValue">
                                           <v-icon slot="badge" dark small  @click="()=>{geoValueEdit = true; editDefValue=defValue}" v-show="geoValueEdit === false" >edit</v-icon>
                                           <v-btn small  v-if="val.name === defValue && geoValueEdit === false" color="info" class="text-xs-center" @click="">{{val.name}}</v-btn>
                                           <v-flex xs12 v-else-if="(geoValueEdit === true) && (val.name === defValue)" >
                                              <v-text-field
                                                    type="text"
                                                    autofocus
                                                    v-model="editDefValue"
                                                    :value="defValue"
                                                    :rules="geoRules"
                                              ></v-text-field>
                                              <v-btn small  class="success text-xs-center" @click="editGeoValue">save</v-btn>
                                           </v-flex>
                                           <v-btn small  v-else class="text-xs-center" :id=val.id  @click="setDefValue">{{val.name}}</v-btn>
                                    </v-badge>

                                </v-flex>
                                <v-flex xs6 sm4 md2 lg1 v-show="geoValueEdit === false && curGeoName ==='World region'">
                                    <div>
                                        <v-text-field
                                                type="text"
                                                v-model="newGeoValue"
                                                :rules="geoRules"
                                                placeholder="new value"
                                        ></v-text-field>
                                       <v-btn small class="success text-xs-center" @click="addGeoValue"> NEW </v-btn>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-container>

                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
     </v-container>
        <v-container v-show="this.defValueId">
            <v-layout row justify-space-between >
                <v-flex xs12 >
                    <v-card>
                        <v-card-text>
                            <v-layout row justify-space-between>
                               <v-flex xs2>
                                   <v-select
                                     :items="listAllowedGeo"
                                     item-value="custChildId"
                                     item-text="custChild"
                                     v-model="curAllowedLocId"
                                     readonly
                                     small
                                     solo
                                     @change="getChildLoc"
                                     label="Select child geo type">
                                   </v-select>
                               </v-flex >
                                <v-flex xs1 justify-center >
                                        <v-chip wigth="100%" label outline color="blue" class="text-xs-center"> SELECTED FOR ---> </v-chip>
                                </v-flex>
                                <v-flex xs2>
                                    <v-btn small class="info text-xs-center" @click=""  >{{defValue}}</v-btn>
                                 </v-flex>

                                <v-flex xs8 >
                                   <v-spacer></v-spacer>
                               </v-flex>
                            </v-layout>
                            <v-container  grid-list-xs>
                                <v-layout row wrap>
                                    <v-flex xs6 sm4 md2 lg1
                                            v-for="val in this.curChildLoc"
                                            :key="val.id"
                                    >
                                        <v-btn small class="text-xs-center" :id="val.id" @click="" >{{val.name}}</v-btn>
                                    </v-flex>
                                    <v-flex xs6 sm4 md2 lg1>
                                        <div v-if="curAllowedLocId">
                                            <v-text-field
                                                    type="text"
                                                    v-model="newChildloc"
                                                    :rules="geoRules"
                                                    placeholder="new value"
                                            ></v-text-field>
                                            <v-btn small class="success text-xs-center" @click="addChildLoc"> new </v-btn>
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-container>

                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>




 </v-container>
</template>

<script>

export default {
        name: "GeoStructure",

    data () {
            return {
               newGeo:"",
               newGeoValue:"",
               newChildloc:"",

               curGeoId:null,
               curGeoName:null,

               curCustValue:null,
               newCustChildId:null,

               defaultChildId:null,
               defaultChildName:'',

               defValue:"",
               editDefValue:"",
               defValueId:null,

               curAllowedLocId:null,

               defLoc:"",
               defLocId:null,

               valid: false,
               valid1: false,

               geoValueEdit:false,

               geoRules: [
                    v => !!v || 'Name is required'
                ],
            }
        },
        created () {
            return this.$store.dispatch('loadGeoTypes')
        },
        computed : {
            geoTypes () { return this.$store.getters.getGeoTypes},
            curGeoValues () { return this.$store.getters.getAllValuesOfGeo},
            customChildren () { return this.$store.getters.getCustomChild},
            listAllowedGeo () { return this.$store.getters.getListAllowedGeo},
            curChildLoc () { return this.$store.getters.getCurChildLoc},
        },
        methods : {
            newGeoType () {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('addGeoType', {geoname: this.newGeo});
                    this.newGeo = '';
                }
            },
            selectGeo (key) {
                this.defValue = "";
                this.defValueId = null;
                this.curAllowedLocId = null;

                this.curGeoId = key;

                let num = this.geoTypes.findIndex(i => i.id === key);
                this.curGeoName = this.geoTypes[num].geoname;
                this.defaultChildId = this.geoTypes[num].defaultChildId;

                if (this.defaultChildId !== null) {
                    let ind = this.geoTypes.findIndex(i => i.id === this.defaultChildId);
                    this.defaultChildName = this.geoTypes[ind].geoname;
                } else { this.defaultChildName=""}


                this.$store.dispatch('getAllValuesOfGeo', this.curGeoId);

                this.$store.dispatch('getCustomChild', this.curGeoId);



            },
            delGeo (key) {
                if (this.curGeoValues.length === 0) {
                          this.$store.dispatch('delGeoType', key);}
                    else {
                    this.$store.dispatch('setError', {message:'Geo type have child, not allowed to delete !'});
                }
            },
            setDefChild () {
                this.$store.dispatch('setDefChild', {id:this.defaultChildId, idParent:this.curGeoId})
            },
            addCustChild () {
                if (this.$refs.form1.validate()) {
                    this.$store.dispatch('addCustChild', {
                        idParent: this.curGeoId,
                        custValueId: this.curCustValue,
                        custChildId: this.newCustChildId
                    });
                    this.curCustValue = null;
                    this.newCustChildId = null;
                }
            },

            delCustomChild (key) {
                this.$store.dispatch('delCustomChild', {id:key, idParent:this.curGeoId})
            },

            addGeoValue () {
                this.$store.dispatch('addGeoValue',{idParent:this.curGeoId, value:this.newGeoValue});
                this.newGeoValue="";
            },
            setDefValue (event) {
                this.defValue = event.target.textContent;
                this.defValueId = event.currentTarget.id;
                this.$store.dispatch('getListAllowedGeo', {geoId:this.curGeoId, valId:this.defValueId});
            },
            editGeoValue () {
                this.$store.dispatch('editGeoValue', {id:this.defValueId, idParent:this.curGeoId, value:this.editDefValue});
                this.geoValueEdit = false;
            },

            getChildLoc () {
                this.$store.dispatch('getChildLoc',{itemGeoType:this.curAllowedLocId, idParent:this.defValueId})
            },
            addChildLoc () {
                this.$store.dispatch('addChildLoc',{itemGeoType:this.curAllowedLocId, idParent:this.defValueId, name:this.newChildloc});
                this.newChildloc="";
            }
        }

    }
</script>

<style scoped>

</style>