import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import GalleryService from "../services/GalleryService";

export const store = new Vuex.Store({
  state: {
    galleries: []
  },
  getters: {
    getGalleries(state) {
      return state.galleries;
    }
  },
  mutations: {
    setGalleries(state, galleries) {
      state.galleries = galleries;
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
