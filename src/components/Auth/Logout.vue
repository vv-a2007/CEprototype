<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm10 md8 lg6 wrap align-center>
                <v-card>
                    <v-card-title primary-title align-center>
                        <div class="headline text-xs-center">You have successfully logged out of your account!</div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Logout",
        created () {this.$store.dispatch('logOutUser')}
    }
</script>

<style scoped>

</style>