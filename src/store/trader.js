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
        this.shortDescription = "";
        this.discountRules = [];
        this.promoRules = [];
        this.deliveryZones = [];
        this.specialDelivery = [];
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

class Location {
    constructor(loc, adr, str, postcode){
        this.loc = loc;
        this.adr = adr;
        this.str = str;
        this.postcode = postcode;
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
        editBasicLocation (state, payload) {
            state.shop.basicLocation = payload;
        },
        editDiscountRules (state, payload) {
            state.shop.discountRules = payload
        },
        editPromoRules (state, payload) {
            state.shop.promoRules = payload
        }
        ,
        addDeliveryZone (state, payload) {
            state.shop.deliveryZones.push(payload)
        },
        editDeliveryZone (state, payload) {
            state.shop.deliveryZones[payload.index] = payload.zone
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
                    shop.basicLocation = !!shops[key].basicLocation ? shops[key].basicLocation : null;
                    shop.shortDescription = shops[key].shortDescription;
                    shop.logoSrc = shops[key].logoSrc;
                    shop.discountRules = !!shops[key].discountRules ? shops[key].discountRules : [];
                    shop.promoRules = !!shops[key].promoRules ? shops[key].promoRules : [];
                    shop.deliveryZones = !!shops[key].deliveryZones ? shops[key].deliveryZones : [];
                    shop.specialDelivery = !!shops[key].specialDelivery ? shops[key].specialDelivery : [];
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
                if (shop.logoSrc === "") {
                    const image = shop.logo;
                    const imageExt = image.name.slice(image.name.lastIndexOf('.'));
                    const fileData = await fb.storage().ref(`logoTradersShops/${shop.id}${imageExt}`).put(image);
                    shop.logoSrc = fileData.downloadURL;
                }
                await fb.database().ref('users/'+idUser+'/tradersShops/'+shop.id).update({
                    name:             shop.name,
                    shortDescription: shop.shortDescription,
                    currency:         shop.currency,
                    basicLocation:    shop.basicLocation,
                    logoSrc:          shop.logoSrc,
                    discountRules:    shop.discountRules,
                    promoRules:       shop.promoRules,
                    deliveryZones:    shop.deliveryZones,
                    specialDelivery:  shop.specialDelivery
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

        async editBasicLocation ({commit},{idUser, idShop, loc, adr, str, postcode}) {
            commit('clearError');
            commit('setLoading', true);
            try {
                if (!!idUser && !!idShop) {
                    const locate = new Location(loc, adr, str, postcode);
                    await fb.database().ref('users/' + idUser + '/tradersShops/' + idShop + '/basicLocation').set(locate);
                    commit('editBasicLocation', locate);
                }
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async editDiscountRules ({commit}, payload){
            commit('clearError');
            commit('setLoading', true);
            try {
                await fb.database().ref('users/' + payload.idUser + '/tradersShops/' + payload.idShop + '/discountRules').set(payload.discountRules);
                commit('editDiscountRules', payload.discountRules);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }

        },
        async editPromoRules ({commit}, payload){
            commit('clearError');
            commit('setLoading', true);
            try {
                await fb.database().ref('users/' + payload.idUser + '/tradersShops/' + payload.idShop + '/promoRules').set(payload.promoRules);
                commit('editPromoRules', payload.promoRules);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }

        },
        async addDeliveryZone ({commit},payload){
            commit('clearError');
            commit('setLoading', true);

            try {
                let newZone = payload.zone;
                commit('addDeliveryZone', newZone);
                let delZones = this.getters.deliveryZones;
                await fb.database().ref('users/' + payload.idUser + '/tradersShops/' + payload.idShop + '/deliveryZones').set(delZones);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async editDeliveryZone ({commit},payload){
            commit('clearError');
            commit('setLoading', true);

            try {
                let editZone = payload.zone;
                commit('editDeliveryZone', payload);
                let edZones = this.getters.deliveryZones;
                await fb.database().ref('users/' + payload.idUser + '/tradersShops/' + payload.idShop + '/deliveryZones').set(edZones);
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
        getShop: state => id=> {return state.shop = state.tradersShops[state.tradersShops.findIndex(i=>i.id===id)]},
        discountRules (state) {return !!state.shop ? state.shop.discountRules : []},
        promoRules (state) {return !!state.shop ? state.shop.promoRules : []},
        deliveryZones (state) {return !!state.shop ? state.shop.deliveryZones : []}
    }
}