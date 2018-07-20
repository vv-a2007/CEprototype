<template>
    <v-container>
        <v-layout row justify-center wrap>
            <v-flex xs-12 sm10 md8 lg7>
                <v-spacer></v-spacer>
              <v-card v-if="!loading">
                <v-card-media
                   :src="ad.imgSrc"
                   height="400px"
                >
                </v-card-media>
                  <v-card-text>
                      <div class="headline">{{ad.title}}</div>
                      <span class="grey--text">{{ad.campaign}}</span>
                      <p>{{ad.description}}</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <edit-ad-modal
                        :ad="ad"
                        ></edit-ad-modal>
                </v-card-actions>
              </v-card>
                <div v-else>
                    <v-container>
                        <v-layout row>
                            <v-flex xs12 class="text-xs-center pt-5">
                                <v-progress-circular
                                        :size="100"
                                        :width="4"
                                        color="primary"
                                        indeterminate
                                ></v-progress-circular>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import  EditAdModal from './EditAdModal'
    export default {
        props:['id'],
        components: {EditAdModal},
        computed: {
               ad() {
                   const id = this.id;
                   return this.$store.getters.adById(id);
               },
            loading (){return this.$store.getters.loading}
            }
    }
</script>

<style scoped>

</style>