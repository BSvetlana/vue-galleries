<template>
    <div>
        <ul class="list-group" v-for="(gallery,key) in galleries" :key="key">
            <router-link :to="{name: 'single-gallery', params: {id: gallery.id}}">
            <li   class="list-group-item">Name Gallery: {{ gallery.name }}</li>
            </router-link>
            <img v-if="gallery.cover_image" :src="gallery.cover_image.url" class="img-fluid" alt="Responsive image">
            <li   class="list-group-item">Owner: {{ gallery.owner.first_name}} {{ gallery.owner.last_name}}</li>
            <li   class="list-group-item">Created: {{ gallery.updated_at}}</li>
            <li   class="list-group-item">Created: {{ gallery.id}}</li>

                            
        </ul>
        <galleries-pagination v-if="!count" class=" mt-4"/>
        <button @click="topFunction()" id="myBtn" title="Go to top">Back To Top</button>
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
      page: "getPage"
    }),
    count() {
      return this.page > this.galleries.length / 10;
    }
  },
  methods: {
    ...mapMutations(["setPage", "setCount"]),
    ...mapActions(["searchGalleries", "nextPage"]),
    topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  mounted() {
    this.searchGalleries();
  }
};
</script>

<style>
#myBtn {
  bottom: 20px;
  right: 30px;
  width: 100%;
  float: right;
  font-size: 18px;
  border: none;
  outline: none;
  background-color: rgb(233, 119, 42);
  color: white;
  cursor: pointer;
  padding: 15px;
  border-radius: 4px;
}
</style>

