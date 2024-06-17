import request from '@/utils/request'
const customUrl = 'v1/'
const bonds = {
  state: {
    billing: [],
    merchant_debts: [],
    merchant_transactions: []
  },
  getters: {
    getBilling: state => state.bonds
  },
  mutations: {
    SET_BILLING (state, payload) {
      state.bonds = payload
    }
  },
  actions: {
    postBilling ({ commit }, data) {
      return new Promise((resolve, reject) => {
        request({
          url: customUrl + 'transfer-payment',
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
    },
    getMerchantTransaction ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: customUrl + 'merchants/' + params.id + '/transactions',
          method: 'get',
          params: params.query
        })
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getMerchantDebts ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: customUrl + 'merchant-debts',
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
    getMerchantTransactions ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: customUrl + 'merchant-transactions',
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
    deleteBond ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: customUrl + 'bond/' + id,
          method: 'delete'
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
export default bonds
