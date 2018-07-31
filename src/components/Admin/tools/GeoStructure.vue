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
                        <h3>Geotypes</h3>
                    </v-card-text>

                  <v-list >
                      <v-list-tile
                              v-for="geoType in geoTypes"
                              :key="geoType.id"
                              @click="selectGeo(geoType.id)"
                      >
                          <v-list-tile-content @click="style='color:blue'">
                              <v-list-tile-title  >{{ geoType.name }}</v-list-tile-title>
                          </v-list-tile-content>

                          <v-list-tile-action>
                              <v-btn icon ripple>
                                  <v-icon color="grey lighten-1"  @click="delGeo(geoType.id)">backspace</v-icon>
                              </v-btn>
                          </v-list-tile-action>
                      </v-list-tile>
                  </v-list>
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-layout row>
                                <v-flex xs12 justify-space-between>
                                  <v-text-field
                                     type="text"
                                     v-model="newGeo"
                                     :rules="geoRules"
                                     placeholder="Enter new Geo type"
                                  ></v-text-field>
                                  <v-spacer></v-spacer>
                                  <v-btn class="success" @click="newGeoType">Add new</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-form>
                </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs8 row justify-space-between v-show="this.curGeoId">
                <v-card >
                    <v-card-text>
                    <v-layout row justify-space-around >
                        <v-flex xs5>
                            <div >
                                <h3>Geo type</h3>
                                <v-text-field
                                        v-model="curGeoName"
                                        solo
                                ></v-text-field>
                            </div>
                        </v-flex>
                        <v-flex xs5>
                            <div >
                              <h3>Default Geo children</h3>
                                <v-select
                                    :items="geoTypes"
                                    item-value="id"
                                    item-text="name"
                                    solo
                                    v-model="defaultChildId"
                                    @change="setDefChild"
                                    autofocus
                                  ></v-select>
                            </div>
                        </v-flex>
                    </v-layout>

                    <v-layout row justify-space-between>
                      <v-flex  xs12>
                          <h3>Custom Geo Children</h3>
                           <v-list >
                               <v-list-tile
                                v-for="child in customChildren"
                                :key="child.id"
                                @click=""

                        >
                               <v-list-tile-content>
                                <v-list-tile-title>{{ child.name }}</v-list-tile-title>
                               </v-list-tile-content>

                               <v-list-tile-action>
                                <v-btn icon ripple>
                                    <v-icon color="grey lighten-1"  @click="delChild(child.id)">backspace</v-icon>
                                </v-btn>
                               </v-list-tile-action>
                            </v-list-tile>
                          </v-list>
                      </v-flex>
                    </v-layout>


                     <v-form v-model="valid" ref="form" lazy-validation>
                         <v-layout row justify-space-between >
                           <v-flex xs4 >
                              <div>
                                <v-select
                                        :items="curGeoValues"
                                        item-value="id"
                                        item-text="name"
                                        solo
                                        label="For custom value"
                                        @change="curCustValue = value"
                                ></v-select>
                              </div>
                           </v-flex>
                           <v-flex xs4>
                                <v-select
                                        :items="geoTypes"
                                        item-value="id"
                                        item-text="name"
                                        solo
                                        label="Custom child"
                                        @change="newCustChildId = value"
                                ></v-select>
                           </v-flex>
                             <v-flex xs2 >
                                <v-btn ml3 class="success" @click="addCustChild">Add</v-btn>
                             </v-flex>
                      </v-layout>
                     </v-form>
                    </v-card-text>
                </v-card>
              </v-flex>
        </v-layout>
    </v-container>
     <v-container v-show="this.curGeoId">
        <v-layout row justify-space-between m-5>
            <v-flex xs12 >
                <v-card>
                    <v-card-text>
                        <h3>Geo values</h3>
                        <v-container  grid-list-xs>
                            <v-layout row wrap>
                                <v-flex xs6 sm4 md2 lg1 v-for="val in this.curGeoValues" :key="val.name">
                                    <v-text-field
                                            :value="val.name"
                                            solo
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs6 sm4 md2 lg1>
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
 </v-container>
</template>

<script>

export default {
        name: "GeoStructure",
        data () {
            return {
               newGeo:"",
               newGeoValue:"",
               newCustChildId:null,
               curGeoId:null,
               curGeoName:null,
               curGeoValues:[],
               curCustValue:null,
               defaultChildId:null,
               defaultChildName:'',
               customChildren:[],
               valid: false,
               geoRules: [
                    v => !!v || 'Name is required'
                ],
            }
        },
        created () {
            return this.$store.dispatch('loadGeoTypes')
        },
        computed : {
            geoTypes () { return this.$store.getters.getGeoTypes}
        },
        methods : {
            newGeoType () {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('addGeoType', {name: this.newGeo});
                    this.newGeo = '';
                }
            },
            selectGeo (key) {
                this.curGeoId = key;
                let num = this.geoTypes.findIndex(i => i.id === key);
                this.curGeoName = this.geoTypes[num].name;
                this.defaultChildId = this.geoTypes[num].defaultChildId;
                if (this.defaultChildId !== null) {
                    let ind = this.geoTypes.findIndex(i => i.id === this.defaultChildId);
                    this.defaultChildName = this.geoTypes[ind].name;
                }
                this.customChildrenID = this.geoTypes[num].customChildrenId;
                this.$store.dispatch('getAllValuesOfGeo', this.curGeoId);
                this.curGeoValues = this.$store.getters.getValuesCurGeo;
            },
            delGeo (key) {
                this.$store.dispatch('delGeoType', key);

            },
            setDefChild () {
                this.$store.dispatch('setDefChild', {id:this.defaultChildId, idParent:this.curGeoId})
            },
            addCustChild () {

            },
            addGeoValue () {
                this.$store.dispatch('addGeoValue',{parentId:this.curGeoId, value:this.newGeoValue});
                this.newGeoValue="";
            }
        }

    }
</script>

<style scoped>

</style>