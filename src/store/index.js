import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import GalleryService from "../services/GalleryService";
import { authService } from "../services/auth.js";

export const store = new Vuex.Store({
  state: {
    galleries: [],
    isAuthenticated: authService.isAuthenticated(),
    searchTerm: "",
    page: 1,
    authId: null,
    galleryId: null,
    count: 0,
    searchArea: "all"
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
      return state.authId;
    },
    getGalleryId(state) {
      return state.galleryId;
    },
    getCount(state) {
      return state.count;
    },
    getSearchArea(state) {
      return state.searchArea;
    }
  },
  mutations: {
    setGalleries(state, data) {
      state.galleries = data.galleries;
      state.count = data.count;
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
      state.authId = authId;
    },
    setGalleryId(state, galleryId) {
      state.galleryId = galleryId;
    },
    setSearchArea(state, area) {
      state.searchArea = area;
    }
  },
  actions: {
    searchGalleries(store) {
      store.commit("setPage", 1);

      GalleryService.search(store.state.page, store.state.searchTerm, store.state.searchArea, store.state.authId)
        .then(response => {
          store.commit("setGalleries", { galleries: response.data.galleries, count: response.data.count });
        })
        .catch(error => {
          if (error.response.status === 401) {
            authService.logout();
          }
        });
    },
    nextPage(store) {
      store.commit("setPage", store.state.page + 1);
      GalleryService.search(store.state.page, store.state.searchTerm, store.state.searchArea, store.state.authId)
        .then(response => {
          store.commit("concatGalleries", response.data.galleries);
        })
        .catch(error => {
          if (error.response.status === 401) {
            authService.logout();
          }
        });
    },
    fetchAuthGalleries() {
      store.commit("setPage", 1);
      GalleryService.authorsGalleries(store.state.authId, store.state.page, store.state.searchTerm)
        .then(response => {
          store.commit("setGalleries", { galleries: response.data.galleries, count: response.data.count });
        })
        .catch(error => {
          if (error.response.status === 401) {
            authService.logout();
          }
        });
    },
    fetchMyGalleries() {
      store.commit("setPage", 1);
      GalleryService.myGalleries(store.state.page, store.state.searchTerm)
        .then(response => {
          store.commit("setGalleries", { galleries: response.data.galleries, count: response.data.count });
        })
        .catch(error => {
          if (error.response.status === 401) {
            authService.logout();
          }
        });
    }
  }
});
