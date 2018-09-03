<template>
    <v-dialog width="400px" v-model="modal"persistent >
        <v-btn flat large class="warning" slot="activator">Edit</v-btn>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex xs-10>
                        <v-card-text>
                            <v-text-field
                                    name="title"
                                    label="Title"
                                    type="text"
                                    v-model="editedTitle"
                                    placeholder="Enter title"
                            ></v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs-10>
                        <v-card-text>
                            <v-text-field
                                    name="campaign"
                                    label="Campaign"
                                    type="text"
                                    v-model="editedCampaign"
                                    placeholder="Enter campaign name"
                            ></v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs-10>
                        <v-card-text>
                            <v-textarea
                                    name="description"
                                    label="Description"
                                    type="text"
                                    v-model="editedDescription"
                                    multi-line
                                    placeholder="Enter description of ad"
                            ></v-textarea>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs-10>
                        <v-switch
                                label="Show as promo"
                                v-model="promo"
                        ></v-switch>
                    </v-flex>
                </v-layout>

                <v-layout>
                    <v-flex xs-10 row>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat  @click="onCancel">Cancel</v-btn>
                            <v-btn flat class="success" @click="onSave">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "EditAdModal",
        props: ['ad'],
        data (){
            return {
                modal:false,
                editedTitle: this.ad.title,
                editedCampaign: this.ad.campaign,
                editedDescription: this.ad.description,
                promo:this.ad.promo,
                id: this.ad.id
            }
        },
        methods : {
            onCancel () {
                this.editedDescription = this.ad.description;
                this.editedTitle = this.ad.title;
                this.editedCampaign = this.ad.campaign;
                this.modal = false;
            },
            onSave () {
                if (this.editedTitle !=="" && this.editedCampaign !=="" && this.editedDescription !=="") {
                    this.modal = false;
                    this.$store.dispatch('updateAd',{ title: this.editedTitle, campaign: this.editedCampaign, description: this.editedDescription, id: this.id});
                }
            }
        }
    }
</script>

<style scoped>

</style>