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
            window.localStorage.setItem('userId', data.data.user.id)

            this.setAxiosDefaultAuthorizationHeader()
        })
    }

    setAxiosDefaultAuthorizationHeader() {

        const TOKEN = localStorage.getItem('loginToken')
        axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`
    }

    logout() {
        window.localStorage.removeItem('loginToken')
        window.localStorage.removeItem('userId')

        delete axios.defaults.headers.common['Authorization']
    }

    isAuthenticated() {
        return !!localStorage.getItem('loginToken')
    }

    getUserId() {
        return +localStorage.getItem('userId')
    }
}

export const authService = new AuthService()