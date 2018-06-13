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
    index(page = 1) {
        const url = ENDPOINTS.GALLERIES + '/' + page;
        return axios.get(url)


    }
}