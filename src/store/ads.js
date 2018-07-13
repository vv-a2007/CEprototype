import * as fb from 'firebase'

class Ad {
    constructor(title, description, ownerId, imageSrc="", promo = false, id = null, ){
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
        this.imageSrc = imageSrc;
        this.id = id;
        this.promo = promo
    }

}

export default {
    state : {
        ads : []
    },
    mutations : {
        createAdd (state, payload){
            state.ads.push(payload)
        },
        loadAds (state, payload){
            state.ads.push(payload)
        }
    },
    actions : {
        async createAd ({commit}, payload) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const newAd = new Ad(payload.title, payload.description, getters.user.id,payload.imgSrc);
                const ad = await fb.database().ref('ads').push(newAd);
                commit('setLoading', false);
                commit('createAd',{...newAd, id: ad.key})
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },

        async fetchAds ({commit}) {
            commit('clearError');
            commit('setLoading', true);
            const resultAds = [];
            try{
                const fbVal = await fb.database.ref('ads').once('value');
                const ads = fbVal.val();
                Object.keys(ads).forEach((key => {
                    const ad = ads[key];
                    resultAds.push(new Ad(ad.title, ad.description, ad.ownerId, ad.imageSrc, ad.promo, key))
                    }));
                commit('loadAds', resultAds)
            }
            catch(error){
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        }
    },
    getters : {
        ads (state){
            return state.ads
        },
        adById (state){
            return adId => {return state.ads.find(ad => ad.id === adId)}
        }
    }

}