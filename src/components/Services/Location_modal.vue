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
                                    label="Locations"
                                    @change='searchLoc'
                                    placeholder="Enter any part of your location"
                                    prepend-inner-icon="youtube_searched_for"
                                    autofocus
                                    clearable
                            ></v-autocomplete>
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
                model:false
            }
        },
        computed : {
            arrayItemNames () {
                return this.$store.getters.allItemNames;
            }
        },
        created () {
            this.$store.dispatch('getAllItemNames');
        },
        methods : {
            onCancel () {
                this.modal = false;
            },
            onSave () {
                this.modal = false;
            },
            searchLoc (item) {
                if (item.id !== null) {
                     console.log(this.searchText)
                }
            }
        }
    }
</script>

<style scoped>

</style>