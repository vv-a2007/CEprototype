<template>
    <v-container>
        <v-layout row>
            <v-flex>
                <h2>Geostructure</h2>
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex xs3 justify-center wrap>
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
                          <v-list-tile-content>
                              <v-list-tile-title>{{ geoType.name }}</v-list-tile-title>
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
                                <v-flex xs12 justify-center wrap>
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
            <v-flex xs6 justify-center wrap v-show="this.curGeoId">
                <v-card >
                    <v-card-text>
                        <h3>Default Geo children</h3>
                        <v-flex xs12 d-flex wrap justify-center >
                            <v-select
                                    :items="geoTypes"
                                    item-value="id"
                                    item-text="name"
                                    box
                                    v-model="defaultChildId"
                                    @change="setDefChild"
                            ></v-select>
                        </v-flex>


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

                        <v-form v-model="valid" ref="form" lazy-validation>
                        <v-layout row>
                            <v-flex xs12 wrap justify-center >
                                <h4>You can add some custom choise</h4>
                                <v-select
                                        :items="curGeoValues"
                                        item-value="id"
                                        item-text="name"
                                        box
                                        label="For custom value"
                                        @change="curCustValue = value"
                                ></v-select>
                                <v-spacer></v-spacer>
                                <v-select ml3
                                        :items="geoTypes"
                                        item-value="id"
                                        item-text="name"
                                        box
                                        label="Custom child"
                                        @change="newCustChildId = value"
                                ></v-select>

                                <v-spacer></v-spacer>
                                <v-btn ml3 class="success" @click="addCustChild">Add custom</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-form>

                    </v-card-text>

                </v-card>
              </v-flex>
            <v-spacer></v-spacer>
        </v-layout>
    </v-container>
</template>

<script>

export default {
        name: "GeoStructure",
        data () {
            return {
               newGeo:"",
               newCustChildId:null,
               curGeoId:null,
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

            }
        }

    }
</script>

<style scoped>

</style>