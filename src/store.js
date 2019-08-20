import Vue from "vue";
import Vuex from "vuex";
const fb = require("./firebaseConfig");
Vue.use(Vuex);

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit("setCurrentUser", user);
    store.dispatch("fetchUserProfile");
    store.commit("setUserProfile", user);
  }
});

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {}
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    }
  },
  actions: {
    fetchUserProfile({ commit, state }) {
      fb.adminsCollection
        .where("email", "==", state.currentUser.email)
        .get()
        .then(res => {
          res.forEach(doc => {
            commit("setUserProfile", state.currentUser);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearData({ commit }) {
      commit("setCurrentUser", null);
      commit("setUserProfile", {});
    }
  }
});
