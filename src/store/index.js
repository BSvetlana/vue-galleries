import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import GalleryService from "../services/GalleryService";

export const store = new Vuex.Store({
  state: {
    galleries: [],
    isAuthenticated: false,
    searchTerm: "",
    page: 1,
  },
  getters: {
    getGalleries(state) {
      return state.galleries;
    },
    getIsAuthenticated(state) {
      return state.isAuthenticated;
    },
    getSearchTerm(state) {
      return state.searchTerm;
    },
    getPage(state) {
      return state.page;
    }
  },
  mutations: {
    setGalleries(state, galleries) {
      state.galleries = galleries;
    },
    setIsAuthenticated(state, auth) {
      state.isAuthenticated = auth;
    },
    setSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm;
    },
    setPage(state, page) {
      state.page = page;
    },
    concatGalleries(state, galleries) {
      state.galleries = state.galleries.concat(galleries);
    }
  },
  actions: {
    searchGalleries(store) {
      store.commit("setPage", 1);

      GalleryService.search(store.state.page, store.state.searchTerm).then(response => {
        let galleries = response.data.galleries;
        store.commit("setGalleries", galleries);
      });
    },
    nextPage(store) {
      store.commit("setPage", store.state.page + 1);

      GalleryService.search(store.state.page, store.state.searchTerm).then(response => {
        store.commit("concatGalleries", response.data.galleries);

      });
    }

  }
});