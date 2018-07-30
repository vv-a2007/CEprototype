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
                              @click="selectGeo(geoType.key)"
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
            <v-flex xs8 justify-center wrap>
                <v-card >
                    <v-card-text>
                        <h3>Item children</h3>
                    </v-card-text>

                </v-card>
              </v-flex>

        </v-layout>
    </v-container>
</template>

<script>

export default {
        name: "GeoStructure",
        data () {
            return {
               newGeo:"",
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
            geoTypes () { return this.$store.getters.getGeoTypes},
            geoItems () { return this.$store.getters.getGeoItems},
        },
        methods : {
            newGeoType() {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('addGeoType', {name: this.newGeo});
                    this.newGeo = '';
                }
            },
            selectGeo(key) {

            },
            delGeo(key) {
                this.$store.dispatch('delGeoType', key);

            }
        }

    }
</script>

<style scoped>

</style>