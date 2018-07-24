import * as fb from 'firebase'
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from '../router/router'
Vue.use(VueRouter);

class User {
    constructor(id){
        this.id = id;
    }
}

export default {
    state:{
        user:null
    },
    mutations:{
        setUser (state, payload) {
            state.user = payload;
        },
        loadPersonalData (state, payload){
            state.user.firstName = payload.firstName;
            state.user.lastName = payload.lastName;
            state.user.phone = payload.phone;
            state.user.emailBasic = payload.emailBasic;
            state.user.emailReserve = payload.emailReserve;
        }
    },
    actions:{
        async registerUser({commit},{email,passw}){
          commit('clearError');
          commit('setLoading',true);
          try {
          const user = await fb.auth().createUserWithEmailAndPassword(email,passw);
                  commit('setUser', new User(user.uid));
                  commit('setLoading',false);
              }
          catch(error) {
                  commit('setLoading',false);
                  commit('setError', error.message);
                  throw error
                }
        },
        async loginUser({commit},{email,passw}){
            commit('clearError');
            commit('setLoading',true);
            try {
                const user = await fb.auth().signInWithEmailAndPassword(email,passw);
                commit('setUser', user);
                commit('setLoading',false);
            }
            catch(error) {
                commit('setLoading',false);
                commit('setError', error.message);
                throw error
            }
        },
        async autoLoginUser({commit}, payload) {
            commit('setUser', new User(payload.user.uid));
            if ( payload.curPath === '/login/') {router.push('/')} else {router.push(payload.curPath)}


            commit('setLoading',true);
            try {

                const fbVal = await fb.database().ref(`users/${payload.user.uid}`).once('value');
                const user = fbVal.val();
                if (user !== null) {
                    commit('clearError');
                    commit('loadPersonalData', user)
                }
                commit('setLoading',false);
            } catch (error) {
                commit('setLoading',false);
                commit('setError', error.message);
                throw error
            }
        },
        logOutUser({commit}){
              fb.auth().signOut();
              commit('setUser',null)
        },
        async readPersonalData ({commit},{id}){

            commit('setLoading',true);
            try {
                const fbVal = await fb.database().ref(`users/${id}`).once('value');
                const user = fbVal.val();
                if (user !== null) {
                        commit('clearError');
                        commit('loadPersonalData', user)
                    }
                commit('setLoading',false);
            } catch (error) {
                commit('setLoading',false);
                commit('setError', error.message);
                throw error
            }
        },
        async savePersonalData({commit},{id, firstName, lastName, phone, emailBasic, emailReserve}){

            commit('setLoading', true);
            try {
                await fb.database().ref(`users/${id}`).update({firstName, lastName, phone, emailBasic, emailReserve});
                commit('clearError');
                commit('setLoading', false);
            }
            catch (error) {
                commit('setError',error.message);
                commit('setLoading', false);
                throw error
            }
        },
        loadPersonalData({commit},payload) { commit('loadPersonalData', payload)}
    },
    getters:{
        user (state) {
            return state.user
        },
        isUserLogin (state) {
            return state.user !== null;
        },
        userId (state) {
            if (state.user !== null) {return state.user.id}
        }
    }
}