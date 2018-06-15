<template>
    <div class="mb-4">
       <div class="row">
        <div class="col-md-6">
            <button @click="nextPage" 
                    class="btn btn-default btn-lg"
                    >
                <i class="fa fa-circle-o-notch fa-spin">
                </i>
                Load More
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
</style>

