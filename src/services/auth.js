import axios from 'axios'

export default class AuthService {

    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }

    login(email, password) {
        return axios.post('login', {
            email,
            password
        }).then((data) => {
            window.localStorage.setItem('loginToken', data.data.token)

            this.setAxiosDefaultAuthorizationHeader()
        })
    }

    setAxiosDefaultAuthorizationHeader() {

        const TOKEN = localStorage.getItem('loginToken')
        axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`
    }

    logout() {
        window.localStorage.removeItem('loginToken')

        delete axios.defaults.headers.common['Authorization']
    }

    isAuthenticated() {
        return !!localStorage.getItem('loginToken')
    }
}

export const authService = new AuthService()