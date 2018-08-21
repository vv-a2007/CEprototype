import * as fb from 'firebase'
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from '../router/router'
Vue.use(VueRouter);

class Shop {
    constructor(id){
        this.id = id;

    }
}

class Currency {
    constructor(id, iconName, currName, currCode){
        this.id = id;
        this.iconName = iconName;
        this.currName = currName;
        this.currCode = currCode;
    }
}

export default {

    state:{
        tradersShops:[],
        currenciesList:[]
    },

    mutations: {

        loadTradersShops (state, payload) {
            state.tradersShops = payload;
        },

        loadCurrenciesList (state, payload) {
            state.currenciesList = payload;
        },

        addCurrency (state, payload){
            state.currenciesList.push(payload)
        },

        delCurrency (state, id) {
            let num = state.currenciesList.findIndex(i => i.id === id);
            state.currenciesList.splice(num,1);
        }

    },

    actions:{

        async getTradersShops({commit},{idUser}){
          commit('clearError');
          commit('setLoading',true);
          try {
          const user = await fb.database().ref(`users/tradersShops`).once('value');



                  commit('setUser', new Shop());
                  commit('setLoading',false);
              }
          catch(error) {
                  commit('setLoading',false);
                  commit('setError', error.message);
                  throw error
                }
        },

        async getCurrenciesList ({commit}) {
            commit('clearError');
            commit('setLoading',true);
            let currList = [];
            try {
                const fbVal = await fb.database().ref(`currencies`).once('value');
                const currs = fbVal.val();
                if (!!currs) {
                    Object.keys(currs).forEach((key => {
                        const curr = currs[key];
                        let newCurr = new Currency(key, curr.iconName, curr.currName, curr.currCode);
                        currList.push(newCurr);
                    }));

                    commit('loadCurrenciesList', currList);
                }
                commit('setLoading',false);
            }
            catch(error) {
                commit('setLoading',false);
                commit('setError', error.message);
                throw error
            }
        },

        async addCurrency ({commit}, payload) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const newCurr = new Currency(null, payload.iconName, payload.currName, payload.currCode);
                const curr = await fb.database().ref('currencies').push(newCurr);
                newCurr.id = curr.key;
                commit('addCurrency', newCurr);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },

        async delCurrency ({commit}, id) {
            commit('clearError');
            commit('setLoading', true);
            try {
                    await fb.database().ref('currencies/' + id).remove();
                    commit('delCurrency', id);
                    commit('setLoading', false);

            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        }

},
    getters:{
        tradersShops (state) {return state.tradersShops},
        currenciesList (state) {return state.currenciesList}

    }
}