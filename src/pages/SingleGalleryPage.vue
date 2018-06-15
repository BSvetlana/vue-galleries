<template>
    <div class="container mt-4">
        <div class="row">
             <div class="col-md-10 offset-md-1 mt-4 mb-4">
                     <h4 class="card-title">{{ gallery.name}}</h4>
                     <h6 class="card-subtitle mb-2 text-muted">
                         {{ gallery.owner.first_name }}
                         {{ gallery.owner.last_name }} ...
                         <i>{{ gallery.created_at}}</i>
                     </h6>
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
         </div> 
</div>
    </div>
</template>

<script>

import GalleryService from "../services/GalleryService";

export default {
  name: "SingleGalleryPage",
data(){
    return {
        gallery: {},
        
    }
},
  beforeRouteEnter(to, from, next){
  GalleryService.getId(to.params.id)
    .then((response) => {
      next((vm) => {
        vm.gallery = response.data
      })
    })
}

};
</script>

