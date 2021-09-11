import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/services/Api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    suggestions:[],
    results:[],
    callingcode:[],
    currency:[],
    detail:{}
  },
  mutations: {
    SET_RESULTS(state, data){
      let s = state.suggestions;
      let res = s.filter(x =>{
        let s = data.toLowerCase();
        let o = x.name.toLowerCase();
        return o.includes(s)
      })
      state.results = res.slice(0,5)
    },
    SET_SUGGESTIONS(state, data){
      state.suggestions = data
    },
    SET_CALLINGCODE(state, data){
      state.callingcode = data
    },
    CLEAR_CALLINGCODE(state){
      state.callingcode = []
    },
    SET_CURRENCY(state, data){
      state.currency = data
    },
    CLEAR_CURRENCY(state){
      state.currency = []
    },
    CLEAR_SUGGESTIONS(state){
      state.suggestions = []
    },
    SET_DETAIL(state, data){
      state.detail = data
    }
  },
  actions: {
    getSuggestions({ commit }){
      return new Promise((resolve, reject) =>{
        Api().get('')
        .then(response => {
            commit("SET_SUGGESTIONS", response.data);
            resolve(response);
        })
        .catch(error => {
          console.log(error.response);
          reject(error);
        });
      })
    },
    getDetail({ commit, dispatch }, id){
      return new Promise((resolve, reject) =>{
        Api().get('name/'+id)
        .then(response => {
            commit("SET_DETAIL", response.data[0]);
            if(response.data[0].callingCodes.length){
              dispatch("getCallingCode", response.data[0].callingCodes[0]);
            }else{
              commit("CLEAR_CALLINGCODE")
            }
            if(response.data[0].currencies.length){
              dispatch("getCurrency", response.data[0].currencies[0].code);
            }else{
              commit("CLEAR_CURRENCY")
            }
            resolve(response);
        })
        .catch(error => {
          reject(error);
        });
      })
    },
    getCallingCode({commit}, no){
      return new Promise((resolve, reject) =>{
        Api().get('callingcode/'+no)
        .then(response => {
            commit("SET_CALLINGCODE", response.data);
            resolve(response);
        })
        .catch(error => {
          console.log(error.response);
          reject(error);
        });
      })
    },
    getCurrency({commit}, cur){
      return new Promise((resolve, reject) =>{
        Api().get('currency/'+cur)
        .then(response => {
            commit("SET_CURRENCY", response.data);
            resolve(response);
        })
        .catch(error => {
          console.log(error.response);
          reject(error);
        });
      })
    }
  },
  modules: {
  }
})
