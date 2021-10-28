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
      axios.defaults.headers.common["Authorization"] = user.token;
      state.user = user;
    },
    userInfos: function (state, userInfos){
      state.userInfos = userInfos
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
    }
  },
  
  actions: {
    createAccount: ({ commit }, userInfos) => {
      commit('setStatus', 'loading');
      instance
        .post("/signup", userInfos)
        .then(function (res) {
          commit('setStatus', 'signup');
          commit("logUser", res.data);
          console.log(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
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
          commit("logUser", res.data);
          console.log(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
          
        })
        .catch(function (error) {
          commit("setStatus", "error_login");
          console.log(error);
        });
    },
    getUserInfo: function({commit}) {
      instance
        .get("/:id")
        .then(function (res) {
          commit("setStatus", "info");
          commit("userInfos", res.data);
          console.log(res.data);
          /*  localStorage.setItem('user', JSON.stringify(res.data));
          localStorage.setItem("res", JSON.stringify(res.status)); */
        })
        .catch(function (error) {
          commit("setStatus", "error_login");
          console.log(error);
        });
    }
  },
});

export default store;