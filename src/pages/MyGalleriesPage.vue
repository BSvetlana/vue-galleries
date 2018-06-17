<template>
    <div id="myGallery">
      <b-container>
        <b-row>
          <b-col>
            <b-card-group deck  class="col-md-4 col-md-offset-2 d-inline-block ml-2 mt-3"
                                v-for="gallery in galleries"
                                :key="gallery.id">
                      
              <b-card :img-src="gallery.cover_image.url"
                      img-alt="Card image"
                      img-top
                      v-if="gallery.cover_image"
                      style="max-width: 20rem; height: 400px"
                      id="card">
              <router-link :to="{name: 'view-gallery', params: {id: gallery.id}}">
                <h3 class="card-subtitle text-muted mb-2">{{ gallery.name }}</h3>
              </router-link>
              <router-link :to="{name: 'author-galleries', params: {id: gallery.owner.id}}">
                <p class="card-text text-muted">{{ gallery.owner.first_name}} {{ gallery.owner.last_name}}</p>
              </router-link>
                <i style="float:right"> {{ gallery.updated_at}} </i>
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
import GalleriesPagination from "../components/GalleriesPagination";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    GalleriesPagination
  },
  computed: {
    ...mapGetters({
      user: "getUser",
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
    ...mapActions(["fetchMyGalleries", "nextPage"]),
    topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setSearchArea("my");
      vm.setAuthId(null);
      vm.fetchMyGalleries();
    });
  }
};
</script>

<style>
#myGallery {
  margin-top: 5em;
}
</style>


