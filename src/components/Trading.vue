<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs6 md4 lg3 xl2>
                <h1 class="text-lg-right" >My shops list:</h1>
            </v-flex>
            <v-flex xs6 md3 lg2 xl1 pl-2>
                <shop-modal
                        :id-user="idUser"
                        :id="null"
                        icon="add_circle_outline"
                >
                </shop-modal>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex';
    import  ShopModal from './Services/Shop_modal'
    export default {
        name: "Trading",
        components:{ShopModal},
        computed: {
            ...mapGetters({
                'idUser':'userId'
            }),
        },
        created () {
            this.$store.dispatch('getTraderShops', this.idUser);
        },
        data () {
            return {

            }
        }
    }
</script>

<style scoped>

</style>