import request from '@/utils/request'
const partners = {
    state: {
        accounts: [],
        accountsPagination: {},
        accountGroups: [],
        accountGroupsPagination: {},
        paymentGateways: [],
        paymentGatewaysPagination: {},
        operations: [],
        operationsPagination: {}
    },
    getters: {
        accounts: state => state.accounts,
        accountsPagination: state => state.accountsPagination,
        accountGroups: state => state.accountGroups,
        accountGroupsPagination: state => state.accountGroupsPagination,
        paymentGateways: state => state.paymentGateways,
        paymentGatewaysPagination: state => state.paymentGatewaysPagination,
        operations: state => state.operations,
        operationsPagination: state => state.operationsPagination
    },
    mutations: {
        SET_ACCOUNTS (state, payload) {
            state.accounts = payload
        },
        SET_ACCOUNTS_PAGINATION (state, payload) {
            state.accountsPagination = payload
        },
        SET_ACCOUNTS_GROUPS (state, payload) {
            state.accountGroups = payload
        },
        SET_ACCOUNTS_GROUPS_PAGINATION (state, payload) {
            state.accountGroupsPagination = payload
        },
        SET_PAYMENT_GATEWAYS (state, payload) {
            state.paymentGateways = payload
        },
        SET_PAYMENT_GATEWAYS_PAGINATION (state, payload) {
            state.paymentGatewaysPagination = payload
        },
        SET_OPERATIONS (state, payload) {
            state.operations = payload
        },
        SET_OPERATIONS_PAGINATION (state, payload) {
            state.operationsPagination = payload
        }
    },
    actions: {
        getAccountOperations ({ commit }, params) {
            console.log('Get Operations')
          return new Promise((resolve, reject) => {
            request({
              url: `/v1/operations`,
              method: 'get',
              params: {
                  page: params.pagination.current ? params.pagination.current : 1,
                  limit: params.pagination.pageSize ? params.pagination.pageSize : 10,
                  search: params.search ? params.search : ''
              }
            })
              .then(res => {
                const pagination = { ...params.pagination }
                pagination.total = res.count
                pagination.showQuickJumper = true
                commit('SET_OPERATIONS_PAGINATION', pagination)
                console.log('Get Operations', res)
                resolve(res)
            })
              .catch(err => reject(err))
          })
        },
        getPaymentGateways ({ commit }, params) {
            console.log('Get gateways')
          return new Promise((resolve, reject) => {
            request({
              url: `/v1/payment-gateways`,
              method: 'get',
              params: {
                  page: params.pagination.current ? params.pagination.current : 1,
                  limit: params.pagination.pageSize ? params.pagination.pageSize : 10,
                  search: params.search ? params.search : ''
              }
            })
              .then(res => {
                const pagination = { ...params.pagination }
                pagination.total = res.count
                pagination.showQuickJumper = true
                commit('SET_PAYMENT_GATEWAYS_PAGINATION', pagination)
                  resolve(res)
                })
              .catch(err => reject(err))
          })
        },
        getAccountsAccounts ({ commit }, params) {
            return new Promise((resolve, reject) => {
                request({
                    url: `v1/accounts`,
                    method: 'get',
                    params: {
                        page: params.pagination.current ? params.pagination.current : 1,
                        limit: params.pagination.pageSize ? params.pagination.pageSize : 10,
                        search: params.search ? params.search : ''
                    }
                })
                .then(result => {
                    const pagination = { ...params.pagination }
                    pagination.total = result.count
                    pagination.showQuickJumper = true
                    commit('SET_ACCOUNTS_PAGINATION', pagination)
                    console.log('Before return', result)
                    resolve(result)
                // commit('SET_PERMISSIONS', result.permissions)
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        getAccountGroups ({ commit }, params) {
            return new Promise((resolve, reject) => {
                request({
                    url: 'v1/account-groups',
                    method: 'get',
                    params: {
                        page: params.pagination.current ? params.pagination.current : 1,
                        limit: params.pagination.pageSize ? params.pagination.pageSize : 10,
                        search: params.search ? params.search : ''
                    }
                })
                .then(result => {
                    const pagination = { ...params.pagination }
                    pagination.total = result.count
                    pagination.showQuickJumper = true
                    commit('SET_ACCOUNTS_GROUPS_PAGINATION', pagination)
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
            })
        }
    }
}
  export default partners
