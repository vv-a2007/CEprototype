<template>
    <div>
        <v-container>
            <v-layout row justify-center wrap>
                <v-flex xs12 sm10 md10 lg8  >
                    <h1 class="text--headline mb5 text-xs-center ">Add new ad</h1>
                    <v-spacer></v-spacer>
                            <v-form v-model="valid" ref="form" lazy-validation mb-3>
                                <v-text-field
                                        name="title"
                                        label="Title"
                                        type="text"
                                        v-model="title"
                                        :rules="titleRules"
                                        placeholder="Enter titlel"
                                ></v-text-field>
                                <v-text-field
                                        name="campaign"
                                        label="Campaign name"
                                        type="text"
                                        v-model="campaign"
                                        :rules="campaignRules"
                                        placeholder="Enter campaign name"
                                ></v-text-field>
                                <v-textarea
                                        name="description"
                                        label="Description"
                                        type="text"
                                        v-model="description"
                                        multi-line
                                        :rules="descriptionRules"
                                        placeholder="Enter description of ad"
                                ></v-textarea>
                            </v-form>
                            <v-layout mb-1 row wrap>
                                <v-flex xs-12>
                                    <v-btn
                                            class="warning"
                                            @click="uploadAd"
                                    >
                                        Upload
                                        <v-icon right dark>cloud_upload</v-icon>
                                    </v-btn>
                                    <input ref="fileInput"
                                           type="file"
                                           style="display: none;"
                                           accept="image/*"
                                           @change="onFileChange"
                                    >
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs-12>
                                    <v-card-media
                                            v-if="imgSrc"
                                            :src="imgSrc"
                                            height="100px"
                                    >
                                    </v-card-media>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex row>
                                    <div>
                                      <v-switch label="Add to promo" v-model="promo"></v-switch>
                                      <v-spacer></v-spacer>
                                      <v-btn mr-1 class="secondary" @click="cancelAd">Cancel</v-btn>
                                      <v-btn :loading="loading" :disabled="!valid || !image || loading" class="success" @click="createAd">Add new ad</v-btn>
                                    </div>
                                </v-flex>
                            </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "newAd",
        data () {
            return {
                    title: '',
                    campaign: '',
                    description: '',
                    promo: false,
                    image: null,
                    imgSrc: '',


                valid: false,
                titleRules: [
                    v => !!v || 'Title is required'
                ],
                campaignRules: [
                    v => !!v || 'Campaign name is required'
                ],
                descriptionRules: [
                    v => !!v || 'Description is required'
                ]
            }
        },
        computed : {
            loading () {
                return this.$store.getters.loading
            }
        },
        methods : {
            cancelAd () {
                title='';
                campaign='';
                description='';
                promo = false;
                image = null;
                imgSrc='';
                this.$router.push("/")
            },
            createAd () {
                if (this.$refs.form.validate() && this.image){
                    const ad = {
                        title: this.title,
                        campaign: this.campaign,
                        description: this.description,
                        promo: this.promo,
                        imgSrc: this.imgSrc,
                        image: this.image
                    };
                    this.$store.dispatch('createAd',ad)
                        .then(() => {
                            this.$router.push('/adlist')
                        })
                        .catch(() => {});
                }
            },
            uploadAd (){
                this.$refs.fileInput.click();
            },
            onFileChange (event) {
                const file = event.target.files[0];
                const reader = new FileReader();

                reader.onload = e => {
                    this.imgSrc = reader.result
                };
                reader.readAsDataURL(file);
                this.image = file;
            }

        }
    }
</script>

<style scoped>

</style>