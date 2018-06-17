import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://localhost:8000/api'
})

export default {
    store: function (newGalleries) {
        return axios.post('galleries', newGalleries)
    },
    search(page = 1, searchTerm, area, authorId) {
        let authorUrl = '';

        if (authorId) {
            authorUrl = `${authorId}/`;
        }

        return axios.get(area + `-galleries/${authorUrl}${page}/${searchTerm}`)
    },
    getId(id) {
        return axios.get(`galleries/${id}`)
    },
    authorsGalleries(id, page = 1, searchTerm) {
        return axios.get(`authors-galleries/${id}/${page}/${searchTerm}`)
    },
    myGalleries(page = 1, searchTerm) {
        return axios.get(`my-galleries/${page}/${searchTerm}`)
    },
    editGallery(id, newGalleries) {
        return axios.put(`/galleries/${id}`, newGalleries)
    },
    deleteGallery(id) {
        return axios.delete(`/galleries/${id}`)
    }
}