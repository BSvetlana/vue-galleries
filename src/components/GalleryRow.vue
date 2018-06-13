<template>
    <div>
        <ul class="list-group" v-for="gallery in galleries" :key="gallery.id">
            <li class="list-group-item">{{ gallery.name }}</li>
            <li class="list-group-item">{{ gallery.owner.first_name}}</li>
            <img :src="gallery.images[0].url" class="img-fluid" alt="Responsive image">                     
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "GalleryRow",
  computed: {
    ...mapGetters({
      galleries: "getGalleries"
    })
  },
  methods: {
    ...mapActions(["fetchGalleries"])
  },
  mounted() {
    this.fetchGalleries();
  }
};
</script>
