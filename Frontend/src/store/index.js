import {createStore} from 'vuex'

const axios = require("axios");
const instance = axios.create({
  baseURL: "http://localhost:3000/api/auth/",
});
let user = localStorage.getItem('user');
if (!user) {
  user = {
      userId: -1,
      token: '',
    }
}else{
  try{

    user = JSON.parse(user)
    instance.defaults.headers.common["Authorization"] = "Bearer" + " " + user.token;
  }catch{
  user = {
    userId: -1,
    token: "",
  };
  }
}

// create a new store instance. 

const store = createStore({
  state: {
    status: "",
    user: user,
    userInfos: {
      userId: "",
      firstname: "",
      lastname: "",
      email: "",
      imageurl:"",
      isAdmin:"",
    },
  },
  // mutation permet de changer d'etat (state) dans une vue (store)
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common["Authorization"] =
        "Bearer" + " " + user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: "",
      };
      localStorage.removeItem("user");
    },
  },
// actions :  equivalent a mutatuion avec la seul difference au lieu de mutter l'etat  les action commettent la mutation 
  actions: {
    createAccount: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        commit("setStatus", "loading");
        instance
          .post("/signup", userInfos)
          .then(function (res) {
            resolve(res);
            commit("setStatus", "signup");
           
            console.log(res.data);
            
          })
          .catch(function (error) {
            reject(error);
            commit("setStatus", "error_signup");
            console.log(error);
          });
      });
    },

    loginAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");

      return new Promise((resolve, reject) => {
        instance
          .post("/login", userInfos)
          .then(function (res) {
            commit("logUser", res.data);
            commit("setStatus", "login");
            resolve();
          })
          .catch(function () {
            commit("setStatus", "error_login");
            reject();
          });
      })
    },

    getUserInfo: function ({ commit }) {
      let localUserId = JSON.parse(localStorage.getItem("user")).userId;
      console.log(localUserId);
      instance
        .get(`/${localUserId}`)
        .then(function (res) {
          commit("userInfos", res.data);
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updateUser: function ({ commit }) {
      let localUserId = JSON.parse(localStorage.getItem("user")).userId;
      let userInfos = new userInfos();
      instance.put(`/${localUserId}`, userInfos).then(() => {
        commit("update");
        
      }).catch((err) => {
        console.log(err);
      });
    },
  },
});

export default store;