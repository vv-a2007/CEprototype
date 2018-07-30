import * as fb from 'firebase'


class GeoType {
    constructor(id, name, defaultChildId = null, customChildrenId = null) {
        this.id = id;
        this.name = name;
        this.defaultChildId = defaultChildId;
        this.customChildrenId = customChildrenId;
    }

}
export default {
    state:{
        geoTypes: [],
        valuesCurGeo: []
    },
    mutations: {
       loadGeoTypes(state, payload) {
           state.geoTypes = payload
       },
       addGeoType(state, payload) {
           state.geoTypes.push(payload)
       },
       delGeoType (state, payload) {
           let num = state.geoTypes.findIndex(i => i.id === payload);
           state.geoTypes.splice(num,1)
       },
        loadValuesCurGeo(state, payload) {
           state.valuesCurGeo = payload;
        },
        setDefChild(state, payload) {
            state.geoTypes[state.geoTypes.findIndex(i => i.id === payload.idParent)].defaultChildId=payload.id;
        }
    },
    actions: {
        async loadGeoTypes({commit}) {
            commit('setLoading', true);
            const resultGeoTypes = [];
            try {
                const fbVal = await fb.database().ref('geotypes').once('value');
                const geoTypes = fbVal.val();
                if (geoTypes !== null) {
                    Object.keys(geoTypes).forEach((key => {
                        const geoType = geoTypes[key];
                        resultGeoTypes.push(new GeoType(key, geoType.name, geoType.defaultChildId, geoType.customChildrenId))
                    }));
                    commit('loadGeoTypes', resultGeoTypes);
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
         },
        async addGeoType({commit}, payload) {
            commit('clearError');
            commit('setLoading', true);

            try {
                const newGeoType = new GeoType(null, payload.name);
                const geoType = await fb.database().ref('geotypes').push(newGeoType);
                newGeoType.id = geoType.key;
                commit('addGeoType', newGeoType);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async delGeoType({commit}, payload) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const delGeo = await fb.database().ref('geotypes/'+payload).remove();
                commit('delGeoType', payload);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
            },
        async getAllValuesOfGeo({commit}, payload) {
            let name = this.getters.getGeoTypes[this.getters.getGeoTypes.findIndex(i => i.id === payload)].name;
            commit('clearError');
            commit('setLoading', true);
            const allValuesGeo = [];
            try {
                const fbVal = await fb.database().ref(name).once('value');
                const geoValues = fbVal.val();
                if (geoValues !== null) {
                    Object.keys(geoValues).forEach((key => {
                        const geoValue = geoValues[key];
                        allValuesGeo.push(new geoValue(key, geoValue.name))
                    }));
                    commit('loadValuesCurGeo', allValuesGeo);
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
        },
        async setDefChild({commit}, payload) {
            commit('clearError');
            commit('setLoading', true);
            try {
                await fb.database().ref(`geotypes/${payload.idParent}`).update({defaultChildId:payload.id});
                commit('setDefChild',payload);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        }
     },

    getters: {
        getGeoTypes(state) { return state.geoTypes },
        getGeoItems(state) { return state.geoItems },
        getValuesCurGeo (state) { return state.valuesCurGeo }
     }
}