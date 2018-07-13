import * as fb from 'firebase'


class User {
    constructor(id){
        this.id=id
    }
}

export default {
    state:{
        user:null
    },
    mutations:{
        setUser (state, payload) {
            state.user = payload
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
        autoLoginUser({commit}, payload) {
               commit('setUser', new User(payload.uid))
        },
        logOutUser({commit}){
              fb.auth().signOut();
              commit('setUser',null)
        }
    },
    getters:{
        user(state){return state.user},
        isUserLogin (state) { return state.user !== null}
    }
}