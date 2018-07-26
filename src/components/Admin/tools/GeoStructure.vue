<template>
    <v-container>
        <v-layout>
            <v-flex row>
                <h1>Geostructure</h1>
            </v-flex>
            <v-flex row>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "GeoStructure",
        data () {
            return {

            }
        },
        created () {
            this.$store.dispatch('loadGeo')
        },

    }
</script>

<style scoped>

</style>