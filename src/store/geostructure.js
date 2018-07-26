import * as fb from 'firebase'

class GeoType {
    constructor(name, defaultChildId, customChildren) {
        this.name = name;
        this.defaultChildId = defaultChildId;
        this.customChildren = customChildren;
    }

}
export default {
    state: {
        geoTypes: [],
        geoItems: []
    },
    mutations: {

    },
    actions: {
        async loadGeo({commit}) {
            commit('setLoading', true);
            const resultGeoTypes = [];
            try {
                const fbVal = await fb.database().ref('geotypes').once('value');
                const geoTypes = fbVal.val();
                if (geoTypes !== null) {
                    Object.keys(geoTypes).forEach((key => {
                        const geoType = geoTypes[key];
                        resultGeoTypes.push(new GeoType(geoType.name, geoType.defaultChildId, geoType.customChildren))
                    }));
                    commit('loadAds', resultAds);
                    commit('setLoading', false);
                } else {
                    commit('setLoading', false);
                }
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error
            }
         }
     },

    getters: {
        getGeoType(state) { return state.geoTypes },
        getGeoItem(state) {return state.geoItems }
        }
}