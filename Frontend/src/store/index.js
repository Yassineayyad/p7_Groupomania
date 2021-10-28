import {createStore} from 'vuex'

const axios = require("axios");
const instance = axios.create({
  baseURL: "http://localhost:3000/api/auth/",
});
// create a new store instance. 

const store = createStore({
  state: {
    status:'',
    user: {
      userId: -1,
      token: ''
    },
  },
  mutations: {
    setStatus: function(state, status){
      state.status=status;
    },
    logUser: function(state, user){
      state.user=user;
    }
  },
  actions: {
    createAccount: ({ commit }, userInfos) => {
      commit('setStatus', 'loading');
      instance
        .post("/signup", userInfos)
        .then(function (res) {
          commit('setStatus', 'signup');
          commit("logUser", Response.data);
          console.log(res);
        })
        .catch(function (error) {
          commit("setStatus", "error_signup");
          console.log(error);
        });
    },
    loginAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      instance
        .post("/login", userInfos)
        .then(function (res) {
          commit("setStatus", "login");
          console.log(res);
        })
        .catch(function (error) {
          commit("setStatus", "error_login");
          console.log(error);
        });
    },
  },
});

export default store;