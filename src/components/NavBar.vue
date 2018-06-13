<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">All Galleries</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item href="#">Login</b-nav-item>
          <b-nav-item href="#">Register</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
background-image:
  url('https://st3.depositphotos.com/12674628/15278/i/450/depositphotos_152785580-stock-photo-black-slate-background.jpg');
}
.navbar-brand {
  color: whitesmoke !important;
}
.nav-link {
  color: whitesmoke !important;
}
.btn {
  color: whitesmoke !important;
  background: rgb(77, 34, 34);
}
</style>
