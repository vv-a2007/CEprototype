<template>
    <div>
    <v-container>
        <v-layout row>
            <v-flex xs-12 sm3 offset-sm4>
              <h1 class="text--secondary mb3 " >Admin tools</h1>
            </v-flex>
        </v-layout>
    </v-container>
    <v-spacer></v-spacer>
    <v-container grid-list-md>
           <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="tool in toolsList" :key="tool.title">
                        <v-list dark class="primary">
                            <v-list-tile
                                    :to="tool.link"
                            >
                                <v-list-tile-action>
                                    <v-icon x-large color="red darken-2" v-if="tool.icon" >{{tool.icon}}</v-icon>
                                </v-list-tile-action>
                                <v-spacer></v-spacer>
                                <v-list-tile-content>
                                    <v-list-tile-title v-text="tool.title" class="title font-weight-bold"></v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
             </v-flex>
           </v-layout>
    </v-container>
    </div>
</template>

<script>
    export default {
        name: "Tools",
        data () {
            return {
                toolsList:[
                    {icon:'art_track', title:'Advertising ads', link:"/adlist"},
                    {icon:'art_track', title:'Users', link:"/users"},
                    {icon:'art_track', title:'Shop automation', link:"/shop-automation"},
                    {icon:'art_track', title:'Delivery points', link:"/delivery-points"},
                    {icon:'art_track', title:'Geography structure', link:"/geostructure"},
                    {icon:'art_track', title:'Currencies', link:"/currencies"}
                    ]
            }
        }

    }
</script>

<style scoped>

</style>