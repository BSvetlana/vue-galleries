<template>
  <div>
    <b-navbar fixed="top" toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand >Galleries</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item :to="{name: 'all-galleries'}">All Galleries</b-nav-item>
          <b-nav-item :to="{name: 'login-gallery'}" v-if="!isAuth">Login</b-nav-item>
          <b-nav-item :to="{name: 'register-gallery'}" v-if="!isAuth">Register</b-nav-item>
          <b-nav-item :to="{name: 'my-galleries'}" v-if="isAuth">My Galleries</b-nav-item>
          <b-nav-item :to="{name: 'create-gallery'}" v-if="isAuth">Create New Gallery</b-nav-item>
          <a href="" class="nav-item nav-link" @click="logout" v-if="isAuth">Logout</a>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form>
              
          <b-input
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Search Galleries"
          v-model="searchTerm"
          @input="setSearchTerm"
          />
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { authService } from "../services/auth.js";

export default {
  name: "NavBar",

  data() {
    return {
      searchTerm: ""
    };
  },

  computed: {
    ...mapGetters({
      authent: "getIsAuthenticated"
    }),
    isAuth() {
      return this.authent;
    }
  },
  methods: {
    ...mapMutations(["setIsAuthenticated", "setSearchTerm"]),
    ...mapActions(["searchGalleries"]),

    logout() {
      authService.logout();
      this.setIsAuthenticated(false);
    }
  },
  watch: {
    searchTerm: function(value) {
      this.searchGalleries(value);
    }
  }
};
</script>

<style scoped>
.navbar {
  background-image: url("https://st3.depositphotos.com/12674628/15278/i/450/depositphotos_152785580-stock-photo-black-slate-background.jpg");
}
.navbar-brand {
  color: rgb(233, 99, 22) !important;
}
.nav-link {
  color: whitesmoke !important;
}
.btn {
  color: whitesmoke !important;
  background: rgb(233, 99, 22);
}
</style>
