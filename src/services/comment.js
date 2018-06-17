import axios from 'axios'

export default class Comment {
    constructor() {
        axios.defaults.baseURL = 'http://localhost:8000/api/'
    }

    getId(id) {
        return axios.get(`galleries/${id}`)
    }

    addComment(id, newComment) {
        return axios.post(`galleries/${id}/comments`, newComment)
    }

    delete(id) {
        return axios.delete(`comments/${id}`)
    }
}

export const comment = new Comment();