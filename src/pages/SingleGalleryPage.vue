<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10 offset-md-1 mb-4">
        <h4 class="card-title">{{ gallery.name}}</h4>
        <router-link :to="{name: 'author-galleries', params: {id: gallery.owner.id}}">
          <h4 class="card-subtitle mb-2 text-muted">
                {{ gallery.owner.first_name }}
                {{ gallery.owner.last_name }}                
          </h4>
        </router-link>
        <p class="card-subtitle mb-2 text-muted">
        <i>{{ gallery.created_at}}</i>
        </p>   
        <p class="card-text">{{ gallery.description}}</p>
        <hr class="lines">
        <b-carousel id="carousel1"
                    style="text-shadow: 1px 1px 2px #333;"
                    background="#ababab"
                    :interval="4000"
                    mg-width="100%"
        >
        <div v-for="(image,key) in gallery.images" :key="key">
          <a v-bind:href=" image.url " target="_blank" >
            <b-carousel-slide style="height:300px"                                         
                                  :img-src="image.url"                                                                                                
            ></b-carousel-slide> 
            </a>
          </div>
        </b-carousel>
      <hr class="lines">
      <h4 class="mt-4" style="">Comments</h4>
        <b-list-group class="mt-4" v-for="(comment, key) in gallery.comments" :key="key">          
          <b-list-group-item button>
            <p>{{ comment.body}}</p>
              <i style="float:right">{{ comment.created_at }}</i>
              <i style="float:left">{{ comment.owner.first_name }} {{ comment.owner.last_name }}</i>
          </b-list-group-item>
        </b-list-group>
      <hr class="lines">
      <form @submit.prevent="onComment">   
        <div class="form-group">
          <h4 class="mt-4">Add Comments</h4> 
            <div class="col">
              <textarea id="body" name="body" cols="40" rows="5" class="form-control" v-model="newComment.body"></textarea>
            </div>
            <span v-if="errors.body" class="error">
              <div v-for="error in errors.body" :key="error" class="alert alert-danger mt-2" role="alert">
                {{ error }}
              </div>
            </span>
              <button name="submit" type="submit" class="btn btn-secondary btn-lg mb-3">Submit</button>
            </div>       
        </form>
        <button @click="topFunction()" id="myBtn" title="Go to top">Back To Top</button>
      </div> 
    </div>
  </div>
</template>

<script>
import GalleryService from "../services/GalleryService";
import { comment } from "../services/comment.js";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "SingleGalleryPage",
  data() {
    return {
      gallery: {},
      newComment: {
        body: ""
      },
      errors: []
    };
  },
  methods: {
    onComment() {
      comment
        .addComment(this.gallery.id, this.newComment)
        .then(response => {
          this.newComment = {};
          this.gallery.comments.push(response.data);
        })
        .catch(error => {
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
        });
    },
    topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },

  beforeRouteEnter(to, from, next) {
    GalleryService.getId(to.params.id).then(response => {
      next(vm => {
        vm.gallery = response.data;
      });
    });
  }
};
</script>

<style>
.lines {
  background-color: rgb(233, 99, 22) !important;
  height: 1 em;
}
h4 {
  color: rgb(233, 99, 22);
}
#body {
  border: 1px solid rgb(122, 102, 99);
  width: 100%;
}
.btn {
  float: right;
  margin-top: 30px;
}
.container {
  margin-top: 4em;
}
</style>


