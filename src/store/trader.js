import * as fb from 'firebase'
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from '../router/router'
Vue.use(VueRouter);

class Shop {
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.currency = null;
        this.basicLocation = null;
        this.shortDescription = ""
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
        currenciesList:[],
        shop:null
    },

    mutations: {

        loadTradersShops (state, payload) {
            state.tradersShops = payload;
        },

        addShop (state, payload) {
            state.tradersShops.push(payload)
        },
        editShop (state, payload) {
            state.tradersShops[state.tradersShops.findIndex(i => i.id === payload.id)]=payload;
        }
,
        loadCurrenciesList (state, payload) {
            state.currenciesList = payload;
        },

        addCurrency (state, payload){
            state.currenciesList.push(payload)
        },

        delCurrency (state, id) {
            let num = state.currenciesList.findIndex(i => i.id === id);
            state.currenciesList.splice(num,1);
        },
        addBasicLocation (state, payload) {
            state.shop.basicLocation = payload;
        },
        editBasicLocation (state, payload) {
            state.shop.basicLocation = payload;
        }

    },

    actions:{

        async getTradersShops({commit},{idUser}){
          commit('clearError');
          commit('setLoading',true);
          let trShops=[];
          try {
              const fbVal = await fb.database().ref('users/'+idUser+'/tradersShops').once('value');
              const shops = fbVal.val();
              if (!!shops) {
                  Object.keys(shops).forEach((key => {
                    let shop = new Shop(key, shops[key].name);
                    shop.currency = shops[key].currency;
                    shop.basicLocation = shops[key].basicLocation;
                    shop.shortDescription = shops[key].shortDescription;

                    trShops.push(shop);
                  }));
                  commit('loadTradersShops', trShops);

              }
              commit('setLoading',false);
          }
          catch(error) {
                  commit('setLoading',false);
                  commit('setError', error.message);
                  throw error
                }
        },

        async addShop ({commit}, { name, idUser}){
            commit('clearError');
            commit('setLoading', true);

            try {
                const newShop = new Shop(null, name);
                const shop = await fb.database().ref('users/'+idUser+'/tradersShops').push(newShop);
                newShop.id = shop.key;
                commit('addShop', newShop);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },

        async editShop ({commit}, {idUser, shop}){
            commit('clearError');
            commit('setLoading', true);
            try {
                await fb.database().ref('users/'+idUser+'/tradersShops/'+shop.id).update({
                    name:shop.name,
                    shortDescription:shop.shortDescription
                });
                commit('editShop',shop);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
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
        },
        async addBasicLocation ({commit},{idUser, idShop, loc, adr, str, postcode}){
            commit('clearError');
            commit('setLoading', true);
            try {
                const locate = new Location(null, loc, adr, str, postcode);
                const newValue = await fb.database().ref('users/'+idUser+'/shops/'+idShop+'/basicLocation').push(locate);
                locate.id = newValue.key;

                commit('addBasicLoc', locate);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async editBasicLocation ({commit},{idUser, idShop, id, loc, adr, str, postcode}) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const locate = new Location(id, loc, adr, str, postcode);
                await fb.database().ref('users/'+idUser+'/shops/'+idShop+'/basicLocation/'+id).update({loc,adr,str,postcode});

                commit('editBasicLoc', locate);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },

},
    getters:{
        tradersShops (state) {return state.tradersShops},
        currenciesList (state) {return state.currenciesList},
        getShop: state => id=> {return state.tradersShops[state.tradersShops.findIndex(i=>i.id===id)]}
    }
}