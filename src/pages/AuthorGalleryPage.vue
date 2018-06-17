<template>
    <div id="auth">
      <b-container>
        <b-row>
          <b-col>
            <b-card-group deck  class="col-md-4 col-md-offset-2 d-inline-block mb-3 ml-2 mt-3"
                                v-for="gallery in galleries"
                                :key="gallery.id">
                      
              <b-card :img-src="gallery.cover_image.url"
                      img-alt="Card image"
                      img-top
                      v-if="gallery.cover_image"
                      style="max-width: 20rem; height: 450px"
                      id="card">
              <router-link :to="{name: 'view-gallery', params: {id: gallery.id}}">
                <h3 class="card-title text-muted">{{ gallery.name }}</h3>
              </router-link>
              <router-link :to="{name: 'author-galleries', params: {id: gallery.owner.id}}">
                <h5 class="card-text text-muted">
                  {{ gallery.owner.first_name}} {{ gallery.owner.last_name}}
                  
                  </h5>
              </router-link>
              <p class="card-text text-muted">
                <i> {{ gallery.updated_at}} </i>
              </p>
                
              </b-card>

            </b-card-group>
              <galleries-pagination v-if="showMore" class=" mt-3"/>
              <button @click="topFunction()" id="myBtn" title="Go to top">Back To Top</button>
          </b-col>

        </b-row>
      </b-container>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import GalleriesPagination from "../components/GalleriesPagination";

export default {
  components: {
    GalleriesPagination
  },
  data: function() {
    return {
      authId: null
    };
  },
  computed: {
    ...mapGetters({
      galleries: "getGalleries",
      currentTerm: "getSearchTerm",
      page: "getPage",
      count: "getCount"
    }),
    showMore() {
      return this.galleries.length < this.count;
    }
  },
  methods: {
    ...mapMutations(["setPage", "setCount", "setAuthId", "setSearchArea"]),
    ...mapActions(["fetchAuthGalleries", "nextPage"]),
    topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let authId = to.params.id;
      vm.setAuthId(authId);
      vm.setSearchArea("authors");
      vm.fetchAuthGalleries();
    });
  }
};
</script>

<style>
#auth {
  margin-top: 5em;
}
</style>

 