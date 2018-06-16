<template>
    <div>
      <b-container class="mt-4">
        <b-row>
          <b-col>
            <b-card-group deck  class="col-md-4 col-md-offset-2 d-inline-block mt-3 ml-2"
                                v-for="gallery in galleries"
                                :key="gallery.id">
                      
              <b-card :img-src="gallery.cover_image.url"
                      img-alt="Card image"
                      img-top
                      style="max-width: 20rem; height: 400px"
                      id="card">
              <router-link :to="{name: 'single-gallery', params: {id: gallery.id}}">
                <h4 class="card-title">{{ gallery.name }}</h4>
              </router-link>
              <router-link :to="{name: 'author-galleries', params: {id: gallery.owner.id}}">
                <p class="card-text">{{ gallery.owner.first_name}} {{ gallery.owner.last_name}}</p>
              </router-link>
                <i style="float:right"> {{ gallery.updated_at}} </i>
              </b-card>

            </b-card-group>
              <galleries-pagination v-if="!galleryCount" class=" mt-3"/>
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
      page: "getPage"
    }),
    galleryCount() {
      return this.page > this.galleries.length / 10;
    }
  },
    methods: {
    ...mapMutations(["setPage", "setCount", "setUser"]),
    ...mapActions(["fetchUserGalleries", "nextPage"]),
    topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
    beforeRouteEnter(to, from, next) {
    next(vm => {
       let user = to.params.id;
      vm.setUser(user);
      vm.fetchUserGalleries();
      
    });
  }
};
</script>

