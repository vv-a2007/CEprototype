<template>
    <v-dialog width="600px" v-model="modal" persistent>
        <v-btn flat large class="warning" slot="activator">{{sort}}</v-btn>
        <v-card>
            <v-container>
                <v-layout row v-if="!id">
                    <v-flex xs-10>
                        <v-card-text>
                            <v-autocomplete
                                    v-model="model"
                                    :items="arrayItemNames"
                                    color="blue"
                                    return-object
                                    item-text="name"
                                    item-value="id"
                                    id="id"
                                    label="Locations"
                                    @change='searchLoc'
                                    placeholder="Enter any part of your location"
                                    prepend-inner-icon="youtube_searched_for"
                                    autofocus
                                    clearable
                            ></v-autocomplete>

                            <v-select
                              v-if="arPaths.length>0"
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

                            <v-select
                                    v-if="arNextItems.length>0"
                                    :items="arNextItems"
                                    item-value="id"
                                    item-text="name"
                                    :v-model="modelN"
                                    :value="modelN"
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
                    <v-flex xs-10>
                        <v-card-text>

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

export default {
        name: "LocationModal",
        props: ['id', 'sort'],
        data() {
            return {
                modal: false,
                allOk: false,
                model:false,
                modelS:false,
                modelN:false,
                hintS:""
            }
        },
        computed : {
            arrayItemNames () {
                return this.$store.getters.allItemNames;
            },
            currentSearchBreadcrumbs () {return this.$store.getters.getCurrentSearchBreadcrumbs},
            arPaths () {
                let ar=[];
                for (let i=0; i<this.currentSearchBreadcrumbs.length; i++) {
                    ar[i]={num:i, str:"", lastId:null, iDar:[]};
                    for (let y=0; y<this.currentSearchBreadcrumbs[i].length; y++) {
                        ar[i].str += this.currentSearchBreadcrumbs[i][y].name + " / ";
                        ar[i].lastId = this.currentSearchBreadcrumbs[i][y].id;
                        ar[i].iDar[y] = this.currentSearchBreadcrumbs[i][y].id;
                    }
                }
                if (this.currentSearchBreadcrumbs.length>1) {this.hintS="You have more 1 variants"} else { this.hintS=""}

                return ar;
            },
            arNextItems () { return this.$store.getters.getArrayNextItems}
        },
        created () {
            this.$store.dispatch('getAllItemNames');
        },
        methods : {
            onCancel () {
                this.model = false;
                this.modelS = false;
                this.$store.dispatch('getCurrentBreadcrumbs', { idItem:null, type:'Search'});
                this.modal = false;
            },
            onSave () {
                this.model = false;
                this.modelS = false;
                this.$store.dispatch('getCurrentBreadcrumbs', { idItem:null, type:'Search'});
                this.modal = false;
            },
            searchLoc (item) {
                if (item !== null && item.id !== null) {
                    this.$store.dispatch('getCurrentBreadcrumbs', { idItem:item.id, type:'Search'});

                } else {
                    this.$store.dispatch('getCurrentBreadcrumbs', { idItem:null, type:'Search'});
                }
            },
            selectPath (value) {
                if (value !== null ) { this.$store.dispatch(('getNextItemSelect'),{lastId:this.arPaths[value].lastId})}
                else {this.$store.dispatch(('getNextItemSelect'),{lastId:null})}

            },
            selectNext (value) {

            }
        }
    }
</script>

<style scoped>

</style>