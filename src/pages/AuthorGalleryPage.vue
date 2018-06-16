<template>
    <div>
        <ul class="list-group" v-for="(gallery,key) in galleries" :key="key">
            <router-link :to="{name: 'single-gallery', params: {id: gallery.id}}">
            <li   class="list-group-item">Name Gallery: {{ gallery.name }}</li>
            </router-link>
            <img v-if="gallery.cover_image" :src="gallery.cover_image.url" class="img-fluid" alt="Responsive image">
            
            <li   class="list-group-item">Owner: {{ gallery.owner.first_name}} {{ gallery.owner.last_name}}</li>
           
            <li   class="list-group-item">Created: {{ gallery.updated_at}}</li>
                            
        </ul>
        <galleries-pagination v-if="!count" class=" mt-4"/>
        <button @click="topFunction()" id="myBtn" title="Go to top">Back To Top</button>
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
    count() {
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
 