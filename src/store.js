import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { reject } from "q";

Vue.use(Vuex);

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
      return new Promise((resolve, rejext) => {
        axios
          .get("/config/" + id)
          .then(response => {
            context.commit("setUserConfig", response.data.config);
            resolve(response.data.config);
          })
          .catch(err => {
            reject(response);
          });
      });
    },

    postFlatbond(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/flatbond")
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
