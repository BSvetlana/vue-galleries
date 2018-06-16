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
    authId: null,
    user: {},
    galleryId: null
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
    },
    getAuthId(state) {
      return state.authId
    },
    getUser(state) {
      return state.user
    },
    getGalleryId(state) {
      return state.galleryId
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
    },
    setAuthId(state, authId) {
      state.authId = authId
    },
    setUser(state, user) {
      state.user = user
    },
    setGalleryId(state,galleryId) {
      state.galleryId = galleryId
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
    },
    fetchAuthGalleries() {
      store.commit("setPage", 1);
        GalleryService.authorsGalleries(store.state.authId, store.state.page, store.state.searchTerm).then(response => {
        store.commit('setGalleries', response.data.galleries)
      });
    },
    fetchUserGalleries() {
      store.commit("setPage", 1)
      GalleryService.myGalleries(store.state.page, store.state.searchTerm).then(response => {
        store.commit('setGalleries', response.data.galleries)
      })
    }

  }
});