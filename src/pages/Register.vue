<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-8 offset-md-2 mt-3 mb-3">
                <form @submit.prevent="register">
                    <div class="form-group">
                        <label for="first_name">First Name</label>
                        <input v-model="userRegister.first_name" type="text" class="form-control" id="first_name" placeholder="First Name">
                        <span v-if="errors.first_name" class="error">
                            <div  v-for="error in errors.first_name" :key="error" class="alert alert-danger mt-2" role="alert">
                                {{ error }}
                            </div>
                        </span>
                     </div>
                    <div class="form-group">
                        <label for="last_name">Last Name</label>
                        <input v-model="userRegister.last_name" type="text" class="form-control" id="last_name" placeholder="Last Name">
                        <span v-if="errors.last_name" class="error">
                            <div  v-for="error in errors.last_name" :key="error" class="alert alert-danger mt-2" role="alert">
                                {{ error }}
                            </div>
                        </span>
                     </div>
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input v-model="userRegister.email" type="email" class="form-control" id="email" placeholder="Enter email">
                        <span v-if="errors.email" class="error">
                            <div  v-for="error in errors.email" :key="error" class="alert alert-danger mt-2" role="alert">
                                {{ error }}
                            </div>
                        </span>
                     </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input v-model="userRegister.password" type="password" class="form-control" id="password" placeholder="Password">
                        <span v-if="errors.password" class="error">
                            <div  v-for="error in errors.password" :key="error" class="alert alert-danger mt-2" role="alert">
                                {{ error }}
                            </div>
                        </span>
                    </div>
                    <div class="form-group">
                        <label for="password_confirmation">Confirm Password</label>
                        <input v-model="userRegister.password_confirmation" type="password" class="form-control" id="password_confirmation" placeholder="Confirm Password">
                    </div>
                    <div class="form-check">
                        <input v-model="userRegister.terms_and_conditions" type="checkbox" class="form-check-input" id="exampleCheck1">

                        <label class="form-check-label" for="exampleCheck1">I accept terms and conditions</label>
                        <span v-if="errors.terms_and_conditions" class="error">
                            <div  v-for="error in errors.terms_and_conditions" :key="error" class="alert alert-danger mt-2" role="alert">
                                {{ error }}
                            </div>
                        </span>
                    </div>
                    <button type="submit" class="btn btn-secondary btn-lg">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { register } from '../services/register.js'
export default {
    data() {
        return {
            userRegister: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirmation: '',
                terms_and_conditions: ''
            },
            errors: []
        }
    },
    methods: {
        register(){
            register.addUser(this.userRegister)
            .then((response) => {
                this.$router.push({name: 'login'})
            }).catch((error) => {
                if(error.response.status == 422) {
                    this.errors = error.response.data.errors;

                }
            })
        }
    }
    
}
</script>

<style>
.btn {
    float: right;
    margin-top: 30px;
}
.container {
    background-color: beige
}

</style>


