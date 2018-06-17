<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6 offset-md-3 mb-3 mt-4">
                <form @submit.prevent="login">
                    <h3  class="card-text text-muted mt-4">Login</h3>
                <div class="form-group mt-4">
                    <label for="email">Email address</label>
                    <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email">
                    <span v-if="error.length" class="error">
                        <div  class="alert alert-danger mt-2" role="alert">
                            {{ this.error }}
                        </div>
                    </span>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
                    <span v-if="error.length" class="error">
                        <div  class="alert alert-danger mt-2" role="alert">
                            {{ this.error }}
                        </div>
                    </span>
                </div>

                <button type="submit" class="btn btn-secondary btn-lg">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { authService } from "../services/auth.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    ...mapMutations(["setIsAuthenticated"]),
    login() {
      authService
        .login(this.email, this.password)
        .then(() => {
          this.$router.push({ name: "all-galleries" });
          this.setIsAuthenticated(true);
        })
        .catch(error => {
          this.error = error.response.data.error;
        });
    }
  }
};
</script>

<style>
.btn {
  float: right;
  margin-top: 30px;
}
.container {
  background-color: rgb(236, 236, 230);
}
</style>


