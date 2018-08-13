<template>
    <v-dialog width="600px" v-model="modal">
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
                        </v-card-text>
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
                        >
                        </v-select>
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
                    ar[i]={num:i, str:""};
                    for (let y=0; y<this.currentSearchBreadcrumbs[i].length; y++) {
                        ar[i].str += this.currentSearchBreadcrumbs[i][y].name + " / "
                    }
                }
                if (this.currentSearchBreadcrumbs.length>1) { this.hintS="You have more 1 variants"} else { this.hintS=""};
                if (this.currentSearchBreadcrumbs.length>0) { this.modelS=0}
                return ar;
            }
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
            selectPath () {

            }
        }
    }
</script>

<style scoped>

</style>