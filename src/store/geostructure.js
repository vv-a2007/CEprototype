import * as fb from 'firebase'


class GeoType {
    constructor(id, geoname, defaultChildId = null) {
        this.id = id;
        this.geoname = geoname;
        this.defaultChildId = defaultChildId;
    }

}

class GeoValue {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class CustomChild {
    constructor(key, custValue, custChild){
        this.id = key;
        this.custValue = custValue;
        this.custChild = custChild;
    }
}

class AllowedLoc {
    constructor(custChildId, custChild){
        this.custChildId = custChildId;
        this.custChild = custChild;
    }
}

class ChildLoc {
    constructor(id, parent, location){
        this.id = id;
        this.parent = parent;
        this.location = location;
    }
}

export default {
    state:{
        geoTypes: [],
        valuesCurGeo: [],
        custChild: [],
        listAllowedGeo: [],
        childCurLoc: []
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
           state.valuesCurGeo = payload
        },
        setDefChild(state, payload) {
            state.geoTypes[state.geoTypes.findIndex(i => i.id === payload.idParent)].defaultChildId=payload.id;
        },
        addGeoValue(state, payload) {
            state.valuesCurGeo.push(payload)
        },
        addCustChild(state, payload) {
            state.custChild.push(payload)
        },
        loadCustChild(state, payload){
            state.custChild = payload
        },
        loadAllowedGeo(state, payload){
           state.listAllowedGeo = payload
        },
        addChildLoc(state, payload) {
           state.childCurLoc = payload
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
                        resultGeoTypes.push(new GeoType(key, geoType.geoname, geoType.defaultChildId))
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
                const newGeoType = new GeoType(null, payload.geoname);
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
            commit('clearError');
            commit('setLoading', true);
            const allValuesGeo = [];
            try {
                const fbVal = await fb.database().ref('geotypes/'+payload+'/values').once('value');
                const geoValues = fbVal.val();
                if (geoValues !== null) {
                    Object.keys(geoValues).forEach((key => {
                        const geoValue = geoValues[key];
                        const item = fb.database().ref('geoitems/'+key).set({geoType:payload});
                        allValuesGeo.push(new GeoValue(key, geoValue.name))
                    }));
                    commit('loadValuesCurGeo', allValuesGeo);
                    commit('setLoading', false);
                } else {
                    commit('loadValuesCurGeo', []);
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
        },
        async addGeoValue({commit},payload){
            commit('clearError');
            commit('setLoading', true);
            try {
                const geoValue = new GeoValue(null, payload.value);
                const newValue = await fb.database().ref('geotypes/'+payload.idParent+'/values').push(geoValue);
                geoValue.id = newValue.key;
                commit('addGeoValue',geoValue);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async addCustChild({commit}, payload) {
            commit('clearError');
            commit('setLoading', true);
            try {

                const newCust = await fb.database().ref('geotypes/'+payload.idParent+'/custChild').push({id:null, custValueId:payload.custValueId, custChildId:payload.custChildId});

                const custValue = this.getters.getAllValuesOfGeo[this.getters.getAllValuesOfGeo.findIndex(i => i.id === payload.custValueId)].name;
                const custChild = this.getters.getGeoTypes[this.getters.getGeoTypes.findIndex(i => i.id === payload.custChildId)].name;

                const newCustChild = new CustomChild(newCust.key, custValue, custChild);

                commit('addCustChild',newCustChild);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async getCustomChild ({commit}, payload){
            commit('clearError');
            commit('setLoading', true);
            const allCustChild = [];
            try {
                const fbVal = await fb.database().ref('geotypes/'+payload+'/custChild').once('value');
                const custList = fbVal.val();
                if (custList !== null) {
                    Object.keys(custList).forEach((key => {
                        const custValueId = custList[key].custValueId;
                        const custChildId = custList[key].custChildId;
                        const custValue = this.getters.getAllValuesOfGeo[this.getters.getAllValuesOfGeo.findIndex(i => i.id === custValueId)].name;
                        const custChild = this.getters.getGeoTypes[this.getters.getGeoTypes.findIndex(i => i.id === custChildId)].geoname;
                        allCustChild.push(new CustomChild(key, custValue, custChild))
                    }));
                    commit('loadCustChild', allCustChild);
                    commit('setLoading', false);
                } else {
                    commit('loadCustChild', []);
                    commit('setLoading', false);
                }
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async getListAllowedGeo ({commit}, payload){
            commit('clearError');
            commit('setLoading', true);
            const listAllowedGeo = [];
            try {
                const fbVal = await fb.database().ref('geotypes/'+payload.geoId+'/custChild').once('value');
                const custList = fbVal.val();
                let count = 0;
                if (custList !== null) {
                    Object.keys(custList).forEach((key => {
                        const custValueId = custList[key].custValueId;
                        if (custValueId === payload.valId) {
                            const custChildId = custList[key].custChildId;
                            const custChild = this.getters.getGeoTypes[this.getters.getGeoTypes.findIndex(i => i.id === custChildId)].geoname;
                            listAllowedGeo.push(new AllowedLoc(custChildId, custChild));
                            count++;
                       }
                    }));
                }

                if (count === 0) {
                    const fbVal1 = await fb.database().ref('geotypes/'+payload.geoId + '/defaultChildId').once('value');
                    const defChildId = fbVal1.val();
                    if (defChildId !== null) {
                        const defChild = this.getters.getGeoTypes[this.getters.getGeoTypes.findIndex(i => i.id === defChildId)].geoname;
                        listAllowedGeo.push(new AllowedLoc(defChildId, defChild))
                    }
                }

                commit('loadAllowedGeo', listAllowedGeo);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error
            }
        },

        async getChildLoc ({commit}, payload) {

        },

        async addChildLoc ({commit}, {parentGeoTypeId, itemGeoType, idParent, value}) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const geoValue = new GeoValue(null, value);
                const newValue = await fb.database().ref('geotypes/'+itemGeoType+'/values').push(geoValue);
                geoValue.id = newValue.key;

                await fb.database().ref('geoitems/'+geoValue.id).set({geoType:itemGeoType});
                await fb.database().ref('geoitems/'+geoValue.id+'/parents').set({key:idParent});
                await fb.database().ref('geoitems/'+parentGeoTypeId+'/children').set({key:geoValue.id});

                commit('addChildLoc',geoValue);
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
        getAllValuesOfGeo(state) { return state.valuesCurGeo },
        getCustomChild(state) {return state.custChild},
        getListAllowedGeo(state){return state.listAllowedGeo},
        getCurChildLoc (state) {return state.childCurLoc}
     }
}