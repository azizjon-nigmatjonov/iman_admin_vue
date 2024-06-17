import request from '@/utils/request'
const customUrl = 'v1/profit-loss'
const mudaraba = {
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        getPandlList ({ commit }, params) {
            return new Promise((resolve, reject) => {
                request({
                    url: customUrl,
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
        setApplicationPaymentType (_, { data, id }) {
            return new Promise((resolve, reject) => {
                request({
                    url: `${customUrl}/${id}/change-payment-type`,
                    method: 'put',
                    data: data
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        postNetProfitAnnounce (_, data) {
            return new Promise((resolve, reject) => {
                request({
                    url: `v1/net-profit-announce`,
                    method: 'post',
                    data: data
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
  export default mudaraba
