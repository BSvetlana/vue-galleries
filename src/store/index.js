import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import GalleryService from "../services/GalleryService";

export const store = new Vuex.Store({
  state: {
    galleries: [],
    isAuthenticated: false
  },
  getters: {
    getGalleries(state) {
      return state.galleries;
    },
    getIsAuthenticated(state) {
      return state.isAuthenticated
    }
  },
  mutations: {
    setGalleries(state, galleries) {
      state.galleries = galleries;
    },
    setIsAuthenticated(state, auth) {
      state.isAuthenticated = auth
    }
  },
  actions: {
    fetchGalleries(store) {
      GalleryService.index().then(response => {
        let galleries = response.data.galleries;
        store.commit("setGalleries", galleries);
      });
    }
  }
});
