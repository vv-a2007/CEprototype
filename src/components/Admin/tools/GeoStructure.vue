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
                                     <v-icon color="grey darken-2"  @click.stop="delGeo(geoType)" v-if="curGeoName === geoType.geoname">backspace</v-icon>
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
                                    :items="geoTypesForDefCust"
                                    item-value="id"
                                    item-text="geoname"
                                    solo
                                    v-model="defaultChildId"
                                    @change="setDefChild"
                                    autofocus
                                  ></v-select>
                            </div>
                        </v-flex>

                        <v-flex xs12 mb-3><h3>Custom Geo Children</h3></v-flex>
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
                            <v-btn icon ripple v-if="valueForCustDel (item.custValue, item.custChild)">
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
        <v-layout row wrap >

            <v-flex xs12 >
                <v-card>
                    <v-card-text>
                        <h3>Geo values for : {{curGeoName}}</h3>
                        <v-flex no-wrap xs12 fill-height v-if="defValueId">
                            <div  v-for="(crumbs, index) in curGeoBreadcrumbs" :key="index" >
                              <span style="color: blue" v-for="(item, index1) in crumbs" :key="item.id" >
                                 <v-icon   style="color: blue" slot="divider" v-if="index1>0">arrow_right</v-icon>
                                 {{ item.name }}
                             </span>
                            </div>
                        </v-flex>
                        <v-container  grid-list-xs>
                            <v-layout row wrap justify-space-arround mb-2>
                                <v-flex xs6 sm4 md2 lg1 ml-3 v-for="val in curGeoValues" :key="val.name">

                                        <v-badge rigth color="yellow" v-model="val.name === defValue" v-show="geoValueEdit === false">
                                           <v-icon slot="badge" dark small @click="()=>{ geoValueEdit = true; editDefValue =  defValue}" v-show="geoValueEdit === false" >edit</v-icon>
                                           <v-btn small  v-if="val.name === defValue && geoValueEdit === false" color="info" class="text-xs-center" @click="()=>{defValue=''; defValueId = null; curAllowedLocId = null; }">{{val.name}}</v-btn>
                                            <v-btn small  v-else class="text-xs-center" :id=val.id  @click="setDefValue">{{val.name}}</v-btn>
                                        </v-badge>


                                           <v-flex xs12 v-if="(geoValueEdit === true) && (val.name === defValue)" >
                                               <v-badge rigth color="red" v-model="val.name === defValue" >
                                                   <v-icon slot="badge" dark small @click="delGeoValue(val)" v-if="valueForDel">delete_outline</v-icon>
                                                   <v-text-field
                                                    type="text"
                                                    autofocus
                                                    v-model="editDefValue"
                                                    :value="defValue"
                                                    :rules="geoRules"
                                                   ></v-text-field>
                                               </v-badge>
                                               <v-btn small  class="success text-xs-center" @click="editGeoValue">save</v-btn>
                                           </v-flex>


                                </v-flex>
                                <v-flex xs6 sm4 md2 lg1 ml-3 v-show="geoValueEdit === false && curGeoName ==='World region'">
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
            <v-layout row justify-space-between wrap>

                <v-flex xs12 >
                    <v-card>
                        <v-card-text>
                            <v-layout row justify-space-between mb-2>
                               <v-flex xs2>
                                   <v-select
                                     :items="listAllowedGeo"
                                     item-value="custChildId"
                                     item-text="custChild"
                                     v-model="curAllowedLocId"
                                     :value="curAllowedLoc"
                                     readonly
                                     small
                                     solo
                                     @change="getChildLoc"
                                     label="Select child geo type">
                                   </v-select>
                               </v-flex >
                                <v-flex xs1 justify-center ml-2>
                                        <v-chip wigth="100%" label outline color="blue" class="text-xs-center"> Selected From ---> </v-chip>
                                </v-flex>
                                <v-flex xs2 ml-1>
                                    <v-btn small class="info text-xs-center" @click=""  >{{defValue}}</v-btn>
                                 </v-flex>

                                <v-flex xs8 >
                                   <v-spacer></v-spacer>
                               </v-flex>
                            </v-layout>
                            <v-flex no-wrap xs12 fill-height v-if="defLocId">
                                <div  v-for="(crumbs, index) in curValBreadcrumbs" :key="index" >
                                  <span style="color: blue" v-for="(item, index1) in crumbs" :key="item.id" >
                                      <v-icon   style="color: blue" slot="divider" v-if="index1>0">arrow_right</v-icon>
                                      {{ item.name }}
                                  </span>
                                </div>
                            </v-flex>
                            <v-container  grid-list-xs v-if="curAllowedLocId" >
                                <v-layout row wrap justify-space-arround mb-2>
                                    <v-flex xs6 sm4 md2 lg1 ml-3
                                            v-for="val in this.curChildLoc"
                                            :key="val.id"
                                    >

                                        <v-badge rigth color="red" v-model="val.name === defLoc">
                                            <v-icon slot="badge" dark small  @click.stop="delValueFromLoc" v-show="val.name === defLoc" >indeterminate_check_box</v-icon>
                                            <v-btn small  v-if="val.name === defLoc" color="info" class="text-xs-center" @click="()=>{defLoc=''; defLocId = null}">{{val.name}}</v-btn>
                                            <v-btn small  v-else class="text-xs-center" :id=val.id
                                                   @click="()=> { defLoc = val.name; defLocId = val.id; setDefLoc();}">{{val.name}}
                                            </v-btn>
                                        </v-badge>

                                    </v-flex>

                                    <v-flex xs6 sm4 md2 lg1 ml-3>
                                        <div >
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
        <v-container grid-list-xs v-if="curAllowedLocId">
            <v-layout row justify-space-between >
                <v-flex xs12 >
                    <v-card>
                        <v-card-text>
                          <v-layout row justify-space-arround mb-2>
                            <v-flex xs1 justify-center >
                                <v-chip wigth="100%" label outline color="purple" class="text-xs-center"> ALL VALUES OF ---> </v-chip>
                            </v-flex>
                            <v-flex xs1 ml-2>
                                <v-btn small class="cyan darken-3 text-xs-center" @click=""  >{{selectAllowedType}}</v-btn>
                            </v-flex>

                                <v-flex xs10 >
                                    <v-spacer></v-spacer>
                                </v-flex>

                           </v-layout>


                           <v-layout row wrap>
                                    <v-flex xs6 sm4 md2 lg1 ml-3
                                            v-for="val in this.allValueSelectAllowedValue"
                                            :key="val.id"
                                    >
                                        <v-badge rigth color="green" v-model="val.name === defAllLoc">
                                            <v-icon slot="badge" dark small  @click.stop="goValueToLoc" v-show="val.name === defAllLoc" >library_add</v-icon>
                                            <v-btn small  v-if="val.name === defAllLoc" color="info" class="text-xs-center" @click="()=>{defAllLoc=''; defAllLocId = null;}">{{val.name}}</v-btn>
                                            <v-btn small  v-else class="text-xs-center" :id=val.id  @click="()=>{ defAllLoc = val.name; defAllLocId = val.id}">{{val.name}}</v-btn>
                                        </v-badge>

                                    </v-flex>

                           </v-layout>

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
               curAllowedLoc:"",

               defLoc:"",
               defLocId:null,

               defAllLoc:"",
               defAllLocId:null,

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
            geoTypesForDefCust () {
                let ar = [{id:null, geoname:""}];
                ar = ar.concat(this.$store.getters.getGeoTypes);
                return ar;
            },
            curGeoValues () { return this.$store.getters.getAllValuesOfGeo},
            customChildren () { return this.$store.getters.getCustomChild},
            listAllowedGeo () { return this.$store.getters.getListAllowedGeo},
            curChildLoc () { return this.$store.getters.getCurChildLoc},
            selectAllowedType () { return this.$store.getters.getSelectAllowed.geoname},
            allValueSelectAllowedValue () {return this.$store.getters.allValueSelectAllowedValue},
            curGeoBreadcrumbs () {if (this.defValueId !== null){ return this.$store.getters.getCurrentGeoBreadcrumbs} else {return []}},
            curValBreadcrumbs () {if (this.defLocId !== null){ return this.$store.getters.getCurrentValBreadcrumbs} else {return []}}

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


                this.$store.dispatch('getAllValuesOfGeo', this.curGeoId).
                   then(()=>{this.$store.dispatch('getCustomChild', this.curGeoId);});


            },
            delGeo (geoType) {
                if (this.curGeoValues.length === 0) {
                          this.$store.dispatch('delGeoType', geoType);}
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
                    }).
                    then (()=>{if (this.defValueId !== null && this.curGeoId !== null) {this.checkDefValueForDel ();}});
                    this.curCustValue = null;
                    this.newCustChildId = null;
                }

            },
            valueForCustDel (custValue, custChild) {
                return (custValue === this.defValue && custChild === this.curAllowedLoc && this.curChildLoc.length < 1)
            },

            delCustomChild (key) {
                this.$store.dispatch('delCustomChild', {id:key, idParent:this.curGeoId}).
                   then (()=>{if (this.defValueId !== null && this.curGeoId !== null) {this.checkDefValueForDel ();}})

            },

            addGeoValue () {
                this.$store.dispatch('addGeoValue',{idParent:this.curGeoId, value:this.newGeoValue});
                this.newGeoValue="";
            },

            checkDefValueForDel () {
                this.$store.dispatch('checkDefValueForDel', {geoId:this.curGeoId, valId:this.defValueId})
            },

            setDefValue (event) {
                this.curAllowedLocId = null;
                this.curAllowedLoc = "";
                this.defLoc="";
                this.defLocId=null;
                this.defValue = event.target.textContent;
                this.defValueId = event.currentTarget.id;
                this.editDefValue = this.defValue;
                this.checkDefValueForDel ();
                this.$store.dispatch('getListAllowedGeo', {geoId:this.curGeoId, valId:this.defValueId}).then (()=>{
                    let allowed = this.$store.getters.getListAllowedGeo;
                    if (allowed.length > 0 ) {this.curAllowedLocId = allowed[0].custChildId; this.curAllowedLoc = allowed[0].custChild}
                    this.getChildLoc()
                });
                this.$store.dispatch('getCurrentBreadcrumbs', {idItem:this.defValueId, type:"Geo"})
            },
            editGeoValue () {
                this.$store.dispatch('editGeoValue', {id:this.defValueId, idParent:this.curGeoId, value:this.editDefValue});
                this.geoValueEdit = false;
            },
            delGeoValue(val) {
                this.$store.dispatch('delGeoValue', {id:this.defValueId, idParent:this.curGeoId});
                this.geoValueEdit = false;
            },
            setDefLoc () {
                this.$store.dispatch('getCurrentBreadcrumbs', {idItem:this.defLocId, type:"Val"})
            },
            getChildLoc () {
                if (this.curAllowedLocId !=null && this.defValueId != null) {
                this.$store.dispatch('getChildLoc',{itemGeoType:this.curAllowedLocId, idParent:this.defValueId})}
            },
            addChildLoc () {
                this.$store.dispatch('addChildLoc',{itemGeoType:this.curAllowedLocId, idParent:this.defValueId, name:this.newChildloc}).
                   then (()=>{if (this.defValueId !== null && this.curGeoId !== null) {this.checkDefValueForDel ();}});
                this.getChildLoc ();
                this.newChildloc="";

            },
            delValueFromLoc () {
                this.$store.dispatch('delValueFromLoc',{id:this.defLocId, idParent:this.defValueId}).
                   then (()=>{if (this.defValueId !== null && this.curGeoId !== null) {this.checkDefValueForDel ();}});
                this.defLoc="";
                this.defLocId=null;


            },
            goValueToLoc () {
                this.$store.dispatch('goValueToLoc',{id:this.defAllLocId, idParent:this.defValueId, name:this.defAllLoc});
                this.defAllLoc="";
                this.defAllLocId=null;
            }
        }

    }
</script>

<style scoped>

</style>