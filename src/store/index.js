import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import share from './share'
import ads from './ads'
import geostructure from './geostructure'
import trader from './trader'

Vue.use(Vuex);

export default new Vuex.Store ({
//    strict: process.env.NODE_ENV !== 'production',
    modules:{
        user, share, ads, geostructure, trader
    }
})