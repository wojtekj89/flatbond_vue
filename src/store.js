import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { reject } from "q";

Vue.use(Vuex);
axios.defaults.baseURL = "http://localhost:5000";

export default new Vuex.Store({
  state: {
    config: null,
    flatbond: null
  },

  getters: {
    getConfig(state) {
      return state.config;
    },

    getFlatbond(state) {
      return state.flatbond;
    }
  },

  mutations: {
    setUserConfig(state, data) {
      state.config = data;
    },

    createFlatbond(state, data) {
      state.flatbond = data;
    }
  },

  actions: {
    getConfig(context, id) {
      return new Promise((resolve, reject) => {
        axios
          .get("/config/" + id)
          .then(response => {
            context.commit("setUserConfig", response.data.config);
            resolve(response.data.config);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    postFlatbond(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/flatbond", data)
          .then(response => {
            context.commit("createFlatbond", response.data.flatbond);
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
});
