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
                        <label for="url">Add Images</label>
                    <div class="form-group" v-for="(image,key) in newGalleries.images" :key="key">
                        <div class="input-group mb-1">
                            
                            <div class="input-group-append">
                                <span style="background-color: grey; color: black;" @click="removeImage(key)" class="input-group-text" id="inputGroup-sizing-default">X</span>
                            </div>
                            <input v-model="image.url" id="url" placeholder="URL" type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                            </div>              
                            <span v-if="errors['images.' + key + '.url']" class="error">
                                <div v-for="error in errors['images.' + key + '.url']" :key="error"  class="alert alert-danger mt-2" role="alert">
                                    {{ error }}
                                </div>
                            </span>
                    </div>
                    <button style="width: 100%" class="btn btn-secondary btn-sm " @click="addImage">Add image</button>
                    
                    <button style="width: 50%" type="submit" class="btn btn-secondary btn-lg">Submit</button>
                    <button style="width: 50%" @click="cancel" type="submit" class="btn btn-warning btn-lg">Cancel</button>
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
        images: [
          {
            url: "",
            order: 1
          }
        ]
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
        .then(() => {
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
    },
    addImage() {
      this.newGalleries.images.push({
        url: "",
        order: this.newGalleries.images.length + 1
      });
    },
    removeImage(index) {
      this.newGalleries.images.splice(index, 1);
    }
  }
};
</script>

<style>
</style>


