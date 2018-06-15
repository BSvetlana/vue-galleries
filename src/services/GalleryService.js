import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://localhost:8000/api'
})

const ENDPOINTS = {
    GALLERIES: '/all-galleries'
}

export default {
    store: function (newGalleries) {
        return axios.post(ENDPOINTS.GALLERIES, newGalleries)
    },
    search(page = 1, searchTerm) {
        return axios.get(ENDPOINTS.GALLERIES + `/${page}/${searchTerm}`)
    },
    getId(id) {
        return axios.get(`galleries/${id}`)
    }
}