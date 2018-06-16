<template>
    <div class="mb-4">
        <div class="row">
            <div class="col-md-7 text-center">
                <button id="buttonLoad" @click="nextPage" 
                    class="btn btn-default btn-lg"
                >
                <i class="fa fa-circle-o-notch fa-spin">
                    Load More
                </i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "GalleriesPagination",
  methods: {
    ...mapActions(["nextPage"])
  }
};
</script>

<style>
#buttonLoad {
  background-image: url("https://st3.depositphotos.com/12674628/15278/i/450/depositphotos_152785580-stock-photo-black-slate-background.jpg");
  color: whitesmoke;
  width: 10rem;
}
</style>

