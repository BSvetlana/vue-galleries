import axios from 'axios'

export default class Register {
    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }

    addUser(userRegister) {
        return axios.post('/register', userRegister)
    }
}

export const register = new Register();
