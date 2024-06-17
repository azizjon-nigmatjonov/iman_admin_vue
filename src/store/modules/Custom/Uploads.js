import request from '@/utils/request'
import request2 from '@/utils/request2'
const customUrl = '/v1/upload'
const upload = {
state: {
},
getters: {
},
mutations: {
},
actions: {
    uploadImage ({ commit }, data) {
        return new Promise((resolve, reject) => {
            request({
                url: customUrl + '?type=portfolio',
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
    uploadFile ({ commit }, data) {
        return new Promise((resolve, reject) => {
            request({
                url: `/v1/upload-file`,
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
    uploadFileMerchant ({ commit }, data) {
        return new Promise((resolve, reject) => {
            request2({
                url: `/v1/merchants/upload-document`,
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
    upload ({ commit }, data) {
        return new Promise((resolve, reject) => {
            request({
                url: customUrl,
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
    }
}
}
export default upload
