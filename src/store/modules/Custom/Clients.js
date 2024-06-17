import request from '@/utils/request'
const customUrl = 'v1/customers'
const bonds = {
    state: {
        customers: [],
        customersPagination: {}
    },
    getters: {
      clients: state => state.customers,
      clientsPagination: state => state.customersPagination
    },
    mutations: {
        SET_CLIENTS (state, payload) {
            state.clients = payload
        },
        SET_CLIENTS_PAGINATION (state, payload) {
            state.clientsPagination = payload
        }
    },
    actions: {
      getClients ({ commit }, params) {
        return new Promise((resolve, reject) => {
        request({
            url: customUrl,
            method: 'get',
            params
        })
          .then(result => {
          commit('SET_CLIENTS', result.clients)
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getClient ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: customUrl + '/' + id,
          method: 'get'
        }).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
  export default bonds
