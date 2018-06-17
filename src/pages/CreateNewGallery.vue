<template>
 <div class="container mt-4">
        <div class="row">
            <div class="col-md-6 offset-md-3 mb-3 mt-4">
                <form @submit.prevent="submit">
                    <h3  class="card-text text-muted mt-4">Create New Gallery</h3>
                    <div class="form-group mt-4">
                        <label for="name">Name of Gallery</label>
                        <input v-model="newGalleries.name" type="text" class="form-control" id="name" placeholder="Enter Gallery Name">
                    <span v-if="errors.name"  class="error">
                        <div v-for="error in errors.name" :key="error" class="alert alert-danger mt-2" role="alert">
                            {{ error }}
                        </div>
                    </span>
                    </div>
                    <div class="form-group">
                        <label for="description">Description of Gallery</label>
                        <input v-model="newGalleries.description" type="text" class="form-control" id="description" placeholder="Enter Gallery Description">
                     <span v-if="errors.description"  class="error">
                        <div v-for="error in errors.description" :key="error"  class="alert alert-danger mt-2" role="alert">
                            {{ error }}
                        </div>
                    </span>
                    </div>
                    <div class="form-group">
                        <label for="cover_image">Add Images</label>
                        <input v-model="newGalleries.cover_image" type="text" class="form-control" id="cover_image" placeholder="Enter Gallery Description">
                     <span v-if="errors.cover_image"  class="error">
                        <div v-for="error in errors.cover_image" :key="error"  class="alert alert-danger mt-2" role="alert">
                            {{ error }}
                        </div>
                    </span>
                    </div>
                    <button @click="cancel" type="submit" class="btn btn-warning btn-lg">Cancel</button>
                    <button type="submit" class="btn btn-secondary btn-lg">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import GalleryService from "../services/GalleryService";

export default {
  data() {
    return {
      newGalleries: {
        name: "",
        description: "",
        cover_image: ""
      },
      errors: []
    };
  },
  created() {
    this.$route.params.id &&
      GalleryService.getId(this.$route.params.id).then(response => {
        this.newGalleries = response.data;
      });
  },
  methods: {
    submit() {
      if (this.newGalleries.id) {
        this.editGallery();
      } else {
        this.addGallery();
      }
    },
    addGallery() {
      GalleryService.store(this.newGalleries)
        .then(() => {
          this.$router.push({
            name: "my-galleries"
          });
        })
        .catch(error => {
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
        });
    },
    editGallery() {
      GalleryService.editGallery(this.$route.params.id, this.newGalleries)
        .then(response => {
          this.$router.push({ name: "view-gallery" });
        })
        .catch(error => {
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
        });
    },
    cancel() {
      this.$router.push({ name: "my-galleries" });
    }
  }
};
</script>

<style>
</style>


