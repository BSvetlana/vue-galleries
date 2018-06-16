<template>
    <div>
      <b-container>
        <b-row>
          <b-col>
            <b-card-group deck  class="col-md-4 col-md-offset-2 d-inline-block mb-3 ml-2"
                                v-for="gallery in galleries"
                                :key="gallery.id">
                      
              <b-card :img-src="gallery.cover_image.url"
                      img-alt="Card image"
                      img-top
                      id="card">
              <router-link :to="{name: 'single-gallery', params: {id: gallery.id}}">
                <h4 class="card-title text-muted">{{ gallery.name }}</h4>
              </router-link>
              <router-link :to="{name: 'author-galleries', params: {id: gallery.owner.id}}">
                <p class="card-text">{{ gallery.owner.first_name}} {{ gallery.owner.last_name}}</p>
              </router-link>
                <i style="float:right"> {{ gallery.updated_at}} </i>
              </b-card>

            </b-card-group>
              <galleries-pagination v-if="!authCount" class=" mt-3"/>
              
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
      page: "getPage"
    }),
    authCount() {
      return this.page > this.galleries.length / 10;
    }
  },
  methods: {
    ...mapMutations(["setPage", "setCount", "setAuthId"]),
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
      vm.fetchAuthGalleries();
    });
  }
};
</script>
 