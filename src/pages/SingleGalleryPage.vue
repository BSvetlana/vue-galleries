<template>
    <div class="container mt-4">
        <div class="row">
             <div class="col-md-10 offset-md-1 mt-4 mb-4">
                     <h4 class="card-title">{{ gallery.name}}</h4>
                     <router-link :to="{name: 'author-galleries', params: {id: gallery.owner.id}}">
                     <h6 class="card-subtitle mb-2 text-muted">
                         {{ gallery.owner.first_name }}
                         {{ gallery.owner.last_name }}                
                     </h6>
                     </router-link>
                     <i>{{ gallery.created_at}}</i>
                     
                     <p class="card-text">{{ gallery.description}}</p>
             
                    <b-carousel id="carousel1"
                                style="text-shadow: 1px 1px 2px #333;"
                                background="#ababab"
                                :interval="4000"
                                img-width="100%"
                                img-height="500"
                    >
                    <div v-for="(image,key) in gallery.images" :key="key">
                        <a v-bind:href=" image.url " target="_blank" >
                        <b-carousel-slide                                            
                                            style="height:300px"
                                            :img-src="image.url"                                                     
                        ></b-carousel-slide> 
                        </a>
                    </div>
                    </b-carousel>
                    <hr>
                    <h3 class="mt-4">Comments</h3>
                    <b-list-group class="mt-4" v-for="(comment, key) in gallery.comments" :key="key">
                        
                        <b-list-group-item button>
                            <p>{{ comment.body}}</p>
                            <i style="float:right">{{ comment.created_at }}</i>
                            <i style="float:left">{{ comment.owner.first_name }} {{ comment.owner.last_name }}</i>
                        </b-list-group-item>

                    </b-list-group>
            </div> 
        </div>
    </div>
</template>

<script>
import GalleryService from "../services/GalleryService";

export default {
  name: "SingleGalleryPage",
  data() {
    return {
      gallery: {}
    };
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

