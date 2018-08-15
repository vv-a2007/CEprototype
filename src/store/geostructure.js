import * as fb from 'firebase'


class GeoType {
    constructor(id, geoname, defaultChildId = null) {
        this.id = id;
        this.geoname = geoname;
        this.defaultChildId = defaultChildId;
        this.busy = false;
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
    constructor(id, name){
        this.id = id;
        this.name = name;

    }
}

class Location {
    constructor(id, loc, adr, str, postcode){
        this.id = id;
        this.loc = loc;
        this.adr = adr;
        this.str = str;
        this.postcode = postcode;
    }
}

class PickUp {
    constructor(id, loc, str){
        this.id = id;
        this.loc = loc;
        this.str = str;
    }
}

export default {
    state:{
        geoTypes: [],
        valuesCurGeo: [],
        custChild: [],
        listAllowedGeo: [],
        childCurLoc: [],
        selectAllowed:{},
        allValueSelectAllowedValue: [],
        valueForDel: false,
        currentGeoBreadcrumbs: [],
        currentValBreadcrumbs: [],
        currentSearchBreadcrumbs: [],
        allItemNames: [],
        arrayNextItems: [],
        locateList:[],
        pickUpList:[]
    },
    mutations: {
       loadGeoTypes(state, payload) {
           state.geoTypes = payload;
           state.geoTypes.sort(function (a,b) { if (a.geoname.toUpperCase() > b.geoname.toUpperCase()) {return 1} else {return -1}});
       },
       addGeoType(state, payload) {
           state.geoTypes.push(payload);
           state.geoTypes.sort(function (a,b) { if (a.geoname.toUpperCase() > b.geoname.toUpperCase()) {return 1} else {return -1}});
       },
       delGeoType (state, payload) {
           state.geoTypes.sort(function (a,b) { if (a.geoname.toUpperCase() > b.geoname.toUpperCase()) {return 1} else {return -1}});
           let num = state.geoTypes.findIndex(i => i.id === payload);
           state.geoTypes.splice(num,1);
       },
        loadValuesCurGeo(state, payload) {
           state.valuesCurGeo = payload;
           state.valuesCurGeo.sort(function (a,b) { if (a.name.toUpperCase() > b.name.toUpperCase()) {return 1} else {return -1}});
        },
        setDefChild(state, payload) {
            state.geoTypes[state.geoTypes.findIndex(i => i.id === payload.idParent)].defaultChildId=payload.id;
        },
        addGeoValue(state, payload) {
            state.valuesCurGeo.push(payload);
            state.valuesCurGeo.sort(function (a,b) { if (a.name.toUpperCase() > b.name.toUpperCase()) {return 1} else {return -1}});
        },
        editGeoValue(state, payload){
            state.valuesCurGeo[state.valuesCurGeo.findIndex(i => i.id === payload.id)].name = payload.value;
            state.valuesCurGeo.sort(function (a,b) { if (a.name.toUpperCase() > b.name.toUpperCase()) {return 1} else {return -1}});
        },
        setValueForDel (state, payload) {
            state.valueForDel = payload;
        },
        delGeoValue (state, payload){
            state.valuesCurGeo.sort(function (a,b) { if (a.name.toUpperCase() > b.name.toUpperCase()) {return 1} else {return -1}});
            let num = state.valuesCurGeo.findIndex(i => i.id === payload);
            state.valuesCurGeo.splice(num,1)
        },
        addCustChild(state, payload) {
            state.custChild.push(payload);
        },
        loadCustChild(state, payload){
            state.custChild = payload
        },
        delCustomChild(state, payload) {
            let num = state.custChild.findIndex(i => i.id === payload.id);
            state.custChild.splice(num,1)
        },
        loadAllowedGeo(state, payload){
           state.listAllowedGeo = payload;
           state.listAllowedGeo.sort(function (a,b) { if (a.custChild.toUpperCase() > b.custChild.toUpperCase()) {return 1} else {return -1}});
        },
        addChildLoc(state, payload) {
           state.childCurLoc.push(payload);
           state.childCurLoc.sort(function (a,b) { if (a.name.toUpperCase() > b.name.toUpperCase()) {return 1} else {return -1}});
        },
        loadChildLoc(state, payload) {
           state.childCurLoc = payload;
           state.childCurLoc.sort(function (a,b) { if (a.name.toUpperCase() > b.name.toUpperCase()) {return 1} else {return -1}});
        },
        getSelectAllowed(state, payload){
           state.selectAllowed = payload;
        },
        getAllValueSelectAllowed(state, payload){
            state.allValueSelectAllowedValue = payload;
            state.allValueSelectAllowedValue.sort(function (a,b) { if (a.name.toUpperCase() > b.name.toUpperCase()) {return 1} else {return -1}});
        },
        delValueLoc (state, payload){
            let num = state.childCurLoc.findIndex(i => i.id === payload.id);
            state.childCurLoc.splice(num,1);
        },
        currentGeoBreadcrumbs (state, payload){
           state.currentGeoBreadcrumbs = payload
        },
        currentValBreadcrumbs (state, payload){
            state.currentValBreadcrumbs = payload
        },
        currentSearchBreadcrumbs (state, payload){
            state.currentSearchBreadcrumbs = payload
        },
        allItemNames (state, payload){
            state.allItemNames = payload;
            state.allItemNames.sort(function (a,b) { if (a.name.toUpperCase() > b.name.toUpperCase()) {return 1} else {return -1}});
        },
        arrayNextItems (state, payload) {
            state.arrayNextItems = payload;
            state.arrayNextItems.sort(function (a,b) { if (a.name.toUpperCase() > b.name.toUpperCase()) {return 1} else {return -1}});

        },
        addLoc (state,payload) {
            state.locateList.push(payload);
        },
        editLoc (state, payload){
            state.locateList[state.locateList.findIndex(i => i.id === payload.id)] = payload;
        },
        loadDelLoc (state,payload){
            state.locateList = payload
        },
        addPickUp (state,payload) {
            state.pickUpList.push(payload);
        },
        editPickUp (state, payload){
            state.pickUpList[state.pickUpList.findIndex(i => i.id === payload.id)] = payload;
        },
        loadPickUp (state,payload){
            state.pickUpList = payload
        },
        deleteLoc (state, id) {
           let num = state.locateList.findIndex(i => i.id === id);
           state.locateList.splice(num,1)
        },
        deletePickUp (state, id) {
            let num = state.pickUpList.findIndex(i => i.id === id);
            state.pickUpList.splice(num,1)
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
                        let newGeoType = new GeoType(key, geoType.geoname, geoType.defaultChildId);
                        if (!!geoType.defaultChildId || !!geoType.value || !!geoType.custChild) newGeoType.busy = true;
                        resultGeoTypes.push(newGeoType);
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
                if (payload.busy === false) {
                    await fb.database().ref('geotypes/' + payload.id).remove();
                    commit('delGeoType', payload.id);
                } else {
                    commit('setError','Geo Type have somethings and not alowed to delete !');
                }
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
            },

        getAllValuesOfGeo: async function ({commit}, payload) {

            commit('clearError');
            commit('setLoading', true);
            const allValuesGeo = [];

            try {
                const fbVal = await fb.database().ref('geotypes/' + payload + '/values').once('value');
                const geoValues = fbVal.val();
                if (geoValues !== null) {
                    Object.keys(geoValues).forEach((key => {
                        const geoValue = geoValues[key];
                        allValuesGeo.push(new GeoValue(key, geoValue.name));
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
                await fb.database().ref('geoitems/'+geoValue.id).set({name:payload.value, geoType:payload.idParent});
                commit('addGeoValue',geoValue);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },

         async editGeoValue({commit},{id, idParent, value}){
             commit('clearError');
             commit('setLoading', true);
             try {
                 await fb.database().ref('geotypes/'+idParent+'/values/'+id).update({name:value});
                 await fb.database().ref('geoitems/'+id).update({name:value});
                 commit('editGeoValue',{id,value});
             }
             catch (error) {
                 commit('setError',error.message);
                 commit('setLoading', false);
                 throw error
             }

         },

        async checkDefValueForDel ({commit}, payload){
            commit('clearError');
            commit('setValueForDel', false);
            commit('setLoading', true);
            try {
                const cust = await fb.database().ref('geotypes/'+payload.geoId+'/custChild/custValueID'+payload.valId).once('value');
                const custV = cust.val();
                if (custV !== null) { commit('setValueForDel', false); commit('setLoading', false); return}
                const child = await fb.database().ref('geoitems/'+payload.valId+'/children').once('value');
                const childV = child.val();
                if (childV !== null) { commit('setValueForDel', false); commit('setLoading', false); return}

                commit('setValueForDel',true);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
     },

        async delGeoValue({commit},{id, idParent}){
            commit('clearError');
            commit('setLoading', true);
            try {
                    await fb.database().ref('geotypes/'+idParent+'/values/'+id).remove();

                    const fbVal = await fb.database().ref('geoitems/'+id+'/parents').once('value');
                    const parents = fbVal.val();
                    if (parents !== null) {
                        Object.keys(parents).forEach((async key => {
                        await fb.database().ref('geoitems/'+key+'/children/'+id).remove();
                    }))}

                    await fb.database().ref('geoitems/'+id).remove();

                    commit('delGeoValue', id);
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
                const custChild = this.getters.getGeoTypes[this.getters.getGeoTypes.findIndex(i => i.id === payload.custChildId)].geoname;

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

        async delCustomChild ({commit}, payload) {
            commit('clearError');
            commit('setLoading', true);
            try {
                await fb.database().ref('geotypes/'+payload.idParent+'/custChild/'+payload.id).remove();
                commit('delCustomChild', payload);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
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

                    const fbVal1 = await fb.database().ref('geotypes/'+payload.geoId + '/defaultChildId').once('value');
                    const defChildId = fbVal1.val();
                    if (defChildId !== null) {
                        const defChild = this.getters.getGeoTypes[this.getters.getGeoTypes.findIndex(i => i.id === defChildId)].geoname;
                        listAllowedGeo.push(new AllowedLoc(defChildId, defChild))
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

        async getChildLoc ({commit}, {itemGeoType, idParent}) {

            commit('clearError');
            commit('setLoading', true);
            const allChildLoc = [];
            const selectChildLoc = [];

            async function getName(id) {

                let fbVal = await fb.database().ref('geoitems/' + id).once('value');
                const child = fbVal.val();
                if (child !== null && child.geoType === itemGeoType) {
                    const name = child.name;
                    const loc = new ChildLoc(id, name);
                    selectChildLoc.push(loc);
                }
            }

            try {

                const fbVal = await fb.database().ref('geoitems/' + idParent + '/children').once('value');
                const childVal = fbVal.val();
                if (childVal !== null) {
                    Object.keys(childVal).forEach((key => {
                        allChildLoc.push(key)
                    }));
                    await Promise.all(allChildLoc.map(f => getName(f)));
                    commit('loadChildLoc', selectChildLoc);
                    commit('setLoading', false);
                }
                else {
                    commit('loadChildLoc', []);
                    commit('setLoading', false);
                }

                const fbVal1 = await fb.database().ref('geotypes/' + itemGeoType).once('value');
                const childVal1 = fbVal1.val();
                commit('getSelectAllowed',{id:fbVal1.key, geoname:childVal1.geoname});

                const fbVal2 = await fb.database().ref('geotypes/' + itemGeoType+'/values').once('value');
                const childVal2 = fbVal2.val();
                let allValueSelectAllowed = [];
                if (childVal2 !== null) {
                    Object.keys(childVal2).forEach((key => {
                        const loc = new ChildLoc(key, childVal2[key].name);
                        allValueSelectAllowed.push(loc);
                    }));
                }
                commit('getAllValueSelectAllowed',allValueSelectAllowed);
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error
            }
        },

        async addChildLoc ({commit}, {itemGeoType, idParent, name}) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const geoValue = new ChildLoc(null, name );
                const newValue = await fb.database().ref('geotypes/'+itemGeoType+'/values').push(geoValue);
                geoValue.id = newValue.key;

                await fb.database().ref('geoitems/'+geoValue.id).set({geoType:itemGeoType, name:name});
                await fb.database().ref('geoitems/'+geoValue.id+'/parents/'+idParent).set(idParent);
                await fb.database().ref('geoitems/'+idParent+'/children/'+geoValue.id).set(geoValue.id);

                commit('addChildLoc',geoValue);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },

        async delValueFromLoc ({commit},{id, idParent}){
            commit('clearError');
            commit('setLoading', true);
            try {
                if (id !=null && idParent != null) {
                    await fb.database().ref('geoitems/' + idParent + '/children/' + id).remove();
                    await fb.database().ref('geoitems/' + id + '/parents/' + idParent).remove();
                    commit('delValueLoc', {id})
                }
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async goValueToLoc ({commit}, {idParent, id, name}) {
            commit('clearError');
            commit('setLoading', true);
            try {
                if (id !=null && idParent != null) {
                    await fb.database().ref('geoitems/' + id + '/parents/' + idParent).set(idParent);
                    await fb.database().ref('geoitems/' + idParent + '/children/' + id).set(id);
                    const geoValue = new ChildLoc(id, name);
                    commit('addChildLoc', geoValue);
                }
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },

        async getCurrentBreadcrumbs ({commit},{idItem, type}){
            commit('clearError');
            let PromiseArray=[];
            let pathArray = [];
            pathArray[0]=[];

            const treeGo = async function (z, id) {

                const getItem = async function (id) {
                    const startItem = await fb.database().ref('geoitems/' + id).once('value');
                    return startItem.val();
                };

                const sItem = await getItem(id);

                if (sItem !== null) {pathArray[z].push(new GeoValue(id, sItem.name))}

                if (sItem !== null && !!sItem.parents) {

                        Object.keys(sItem.parents).map( key => {
                            let y = Object.keys(sItem.parents).indexOf(key);
                            let tempArray = [];
                            for (let i = 0; i < pathArray[z].length; i++) {
                                tempArray[i] = new GeoValue(pathArray[z][i].id, pathArray[z][i].name);
                            }
                            pathArray[z + y] = tempArray;
                            PromiseArray.push(Promise.resolve(treeGo(z + y, key)));
                        });
                        await Promise.all(PromiseArray);
                    }
                    else {

                        pathArray[z] = pathArray[z].reverse();
                        if (pathArray[0].length === 0) { pathArray =[] }
                        commit('current'+type+'Breadcrumbs',pathArray);
                        commit('setLoading', false);
                     }

            };

            try {
                if (idItem !== null) {
                    await treeGo(0,idItem);
                }
                else {
                    commit('current'+type+'Breadcrumbs',[]);
                    commit('arrayNextItems',[]);
                    commit('setLoading', false);
                }

            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async getAllItemNames ({commit}){
            commit('clearError');
            commit('setLoading', true);
            let arrayNames=[];
            try {
                const fbVal = await fb.database().ref('geoitems').once('value');
                const geoItems = fbVal.val();
                if (geoItems !== null) {
                        Object.keys(geoItems).forEach((key => {
                            const geoItem = geoItems[key];
                            arrayNames.push(new GeoValue(key, geoItem.name))
                        }));
                       commit('allItemNames',arrayNames);
                }
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async getNextItemSelect ({commit},{lastId}) {

            let PromiseArray=[];

            const getItem = async function (id) {
                const startItem = await fb.database().ref('geoitems/' + id).once('value');
                let item = startItem.val();
                arrayNames.push(new GeoValue(startItem.key, item.name));
                return item;
            };

            commit('clearError');
            commit('setLoading', true);
            let arrayNames=[];
            if (lastId !== null) {
                try {
                    const fbVal = await fb.database().ref('geoitems/' + lastId + '/children').once('value');
                    const geoItems = fbVal.val();
                    if (geoItems !== null) {

                        Object.keys(geoItems).forEach((key => {
                           PromiseArray.push(Promise.resolve(getItem(key)))
                        }));

                    }
                    Promise.all(PromiseArray).then(()=>{
                        commit('arrayNextItems', arrayNames);
                        commit('setLoading', false);
                    });

                }
                catch (error) {
                    commit('setError', error.message);
                    commit('setLoading', false);
                    throw error
                }
            }
            else {
                commit('arrayNextItems', []);
                commit('setLoading', false);
            }

        },
        async addLocation ({commit},{idUser, loc, adr, str, postcode}){
            commit('clearError');
            commit('setLoading', true);
            try {
                const locate = new Location(null, loc, adr, str, postcode);
                const newValue = await fb.database().ref('users/'+idUser+'/locations/delivery').push(locate);
                locate.id = newValue.key;

                commit('addLoc', locate);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async editLocation ({commit},{idUser, id, loc, adr, str, postcode}) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const locate = new Location(id, loc, adr, str, postcode);
                await fb.database().ref('users/'+idUser+'/locations/delivery/'+id).update({loc,adr,str,postcode});

                commit('editLoc', locate);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async getDeliveryLoc ({commit},{idUser}) {
            commit('clearError');
            commit('setLoading', true);
            const allDelLoc = [];
            try {
                const fbVal = await fb.database().ref('users/'+idUser+'/locations/delivery').once('value');
                const locList = fbVal.val();
                if (locList !== null) {
                    Object.keys(locList).forEach((key => {
                        allDelLoc.push(new Location(key, locList[key].loc, locList[key].adr,locList[key].str,  locList[key].postcode))
                    }));
                    commit('loadDelLoc', allDelLoc);
                    commit('setLoading', false);
                } else {
                    commit('loadDelLoc', []);
                    commit('setLoading', false);
                }
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async addPickUp ({commit},{idUser, loc, str}){
            commit('clearError');
            commit('setLoading', true);
            try {
                const locate = new PickUp(null, loc, str);
                const newValue = await fb.database().ref('users/'+idUser+'/locations/pickup').push(locate);
                locate.id = newValue.key;

                commit('addPickUp', locate);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async editPickUp ({commit},{idUser, id, loc, str}) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const locate = new PickUp(id, loc, str);
                await fb.database().ref('users/'+idUser+'/locations/pickup/'+id).update({loc,str});

                commit('editPickUp', locate);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async getPickUp ({commit},{idUser}) {
            commit('clearError');
            commit('setLoading', true);
            const allPickUp = [];
            try {
                const fbVal = await fb.database().ref('users/'+idUser+'/locations/pickup').once('value');
                const locList = fbVal.val();
                if (locList !== null) {
                    Object.keys(locList).forEach((key => {
                        allPickUp.push(new PickUp(key, locList[key].loc,locList[key].str))
                    }));
                    commit('loadPickUp', allPickUp);
                    commit('setLoading', false);
                } else {
                    commit('loadPickUp', []);
                    commit('setLoading', false);
                }
            }
            catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async deleteLoc ({commit},{id, userId}) {
            commit('clearError');
            commit('setLoading', true);
            try {
                await fb.database().ref('users/'+userId+'/locations/delivery/'+id).remove();
                commit('deleteLoc', id);
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },
        async deletePickUp ({commit},{id, userId}) {
            commit('clearError');
            commit('setLoading', true);
            try {
                await fb.database().ref('users/'+userId+'/locations/pickup/'+id).remove();
                commit('deletePickUp', id);
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
        getCurChildLoc (state) {return state.childCurLoc},
        getSelectAllowed (state) {return state.selectAllowed},
        allValueSelectAllowedValue (state) {return state.allValueSelectAllowedValue},
        valueForDel (state) {return state.valueForDel},
        getCurrentGeoBreadcrumbs (state) {return state.currentGeoBreadcrumbs},
        getCurrentValBreadcrumbs (state) {return state.currentValBreadcrumbs},
        getCurrentSearchBreadcrumbs (state) {return state.currentSearchBreadcrumbs},
        allItemNames (state) {return state.allItemNames},
        getArrayNextItems (state) {return state.arrayNextItems},
        getLocateList (state) {return state.locateList},
        getPickUpList (state) {return state.pickUpList},

     }
}