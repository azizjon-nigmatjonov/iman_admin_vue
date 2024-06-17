import request from '@/utils/request'
// const customUrl = '/v1/question/delete-question'

const question = {
state: {
},
getters: {
},
mutations: {
},
actions: {
    deleteQuestion ({ commit }, guid) {
        return new Promise((resolve, reject) => {
            request({
                url: `/v1/question/delete-question/${guid}`,
                method: 'delete'
            })
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
              })
        })
    },
    postQuestion ({ commit }, data) {
        return new Promise((resolve, reject) => {
            request({
                url: `/v1/questions/create-question`,
                method: 'post',
                data
            })
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
              })
        })
    },

    updateQuestion ({ commit }, { guid, data }) {
        return new Promise((resolve, reject) => {
            request({
                url: `/v1/questions/update-question/${guid}`,
                method: 'put',
                data
            })
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
              })
        })
    },
    getQuestions ({ commit }, params) {
        return new Promise((resolve, reject) => {
            request({
                url: `/v1/questions/get-all-questions`,
                method: 'get',
                params
            })
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
              })
        })
    },
    getQuestion ({ commit }, guid) {
        return new Promise((resolve, reject) => {
            request({
                url: `/v1/questions/get-question-by-id/${guid}`,
                method: 'get'
            })
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
              })
        })
    }
}
}
export default question
