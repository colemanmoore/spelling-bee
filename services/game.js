import http from 'axios'

const gameBaseUrl = '/api/current-game'

export const gameService = {

    getCurrent: async function() {
        const resp = await http.get(gameBaseUrl)
        return resp.data
    },

    getById: async function(id) {
        const resp = await http.get(`${gameBaseUrl}/${id}`)
        return resp.data
    },

    post: async function(word) {
        const resp = await http.post(gameBaseUrl, {
            submission: word
        })
        return resp.data
    }
}