<template>
    <div id="allGalleries">

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
                      style="max-width: 30rem; height: 400px"
                      id="card">
              <router-link :to="{name: 'view-gallery', params: {id: gallery.id}}">
                <h3 class="card-subtitle text-muted mb-2">{{ gallery.name }}</h3>
              </router-link>
              <router-link :to="{name: 'author-galleries', params: {id: gallery.owner.id}}">
                <h5 class="card-text text-muted mt-2"><b>{{ gallery.owner.first_name}} {{ gallery.owner.last_name}}</b></h5>
              </router-link>
              <p class="card-text text-muted">
              <i> {{ gallery.updated_at}} </i>
              </p>
                
              </b-card>

            </b-card-group>
              <galleries-pagination v-if="showMore"  class=" mt-3"/>
              <button @click="topFunction()" id="myBtn"><span class="glyphicon glyphicon-chevron-up"></span>Go to Top</button>
              
          </b-col>

        </b-row>
      </b-container>
      
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import GalleriesPagination from "../components/GalleriesPagination";
export default {
  name: "AllGalleries",
  components: {
    GalleriesPagination
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
    ...mapActions(["searchGalleries", "nextPage"]),
    topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setSearchArea("all");
      vm.setAuthId(null);
      vm.searchGalleries();
    });
  }
};
</script>

<style>
#myBtn {
  width: 100%;
  font-size: 18px;
  border: none;
  outline: none;
  background-color: rgb(233, 118, 42);
  color: rgb(73, 72, 72);
  cursor: pointer;
  padding: 0.5em;
  border-radius: 4px;
}
#allGalleries {
  margin-top: 5em;
}
.card {
  border-radius: 5px;
}
a {
  text-decoration: none !important;
}
h4 {
  text-decoration: none;
}
.container {
  background-color: rgb(243, 240, 240) !important;
}
</style>