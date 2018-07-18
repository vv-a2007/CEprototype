import * as fb from 'firebase'

class Ad {
    constructor(title, campaign, description, ownerId, imgSrc, promo = false, id = null, ){
        this.title = title;
        this.campaign = campaign;
        this.description = description;
        this.ownerId = ownerId;
        this.imgSrc = imgSrc;
        this.id = id;
        this.promo = promo
    }

}

export default {
    state : {
        ads : []
    },
    mutations : {
        createAd (state, payload){
            state.ads.push(payload)
        },
        loadAds (state, payload){
            state.ads = payload
        }
    },
    actions : {
        async createAd ({commit}, payload) {
            commit('clearError');
            commit('setLoading', true);
            const image = payload.image;
            try {
                const newAd = new Ad(payload.title, payload.campaign, payload.description,  this.getters.user.id, "", payload.promo);
                const ad = await fb.database().ref('ads').push(newAd);
                const imageExt = image.name.slice(image.name.lastIndexOf('.'));
                const fileData = await fb.storage().ref(`ads/${ad.key}.${imageExt}`).put(image);
                const imgSrc = fileData.metadata.fullPath;
                commit('setLoading', false);
                commit('createAd',{...newAd, id: ad.key, imgSrc})
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
                    resultAds.push(new Ad(ad.title, ad.campaign, ad.description, ad.ownerId, ad.imgSrc, key, ad.promo))
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
        },
        promoAds (state){ return state.ads.filter(ad => {return ad.promo})}
    }

}