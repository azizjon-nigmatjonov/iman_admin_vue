import request from '@/utils/request'
const customUrl = '/v1'
const category = {
    state: {
        reports: []
    },
    getters: {
      getReport: state => state.reports
    },
    mutations: {
        SET_REPORT (state, payload) {
            state.reports = payload
        }
    },
    actions: {
    getInvestmentReports ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: customUrl + '/investments-report',
          method: 'get',
          params: {
              begin_date: params.start,
              end_date: params.end
          }
        }).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getClaimsReports ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: customUrl + '/claims-report',
          method: 'get',
          timeout: 100000000,
          params
        }).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getInvestorReports ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: customUrl + '/investors-report',
          method: 'get',
          timeout: 100000000,
          params
        }).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getInvestorCguReport ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: customUrl + '/investors-cgu-report',
          method: 'get',
          timeout: 100000000,
          params
        }).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getMerchantTransactionsReports ({ commit }, params) {
        return new Promise((resolve, reject) => {
          request({
            url: customUrl + '/merchant-transactions-report',
            method: 'get',
            params: {
                begin_date: params.start,
                end_date: params.end
            }
          }).then(res => {
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        })
      },
      getInstallmentReports ({ commit }, params) {
        return new Promise((resolve, reject) => {
          request({
            url: customUrl + '/installments-report',
            method: 'get',
            params: {
                begin_date: params.start,
                end_date: params.end,
                status: params.status
            }
          }).then(res => {
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        })
      },
      getBondReports ({ commit }, params) {
        return new Promise((resolve, reject) => {
          request({
            url: customUrl + '/bonds-report',
            method: 'get',
            params: {
                begin_date: params.start,
                end_date: params.end
            }
          }).then(res => {
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        })
      },
    getInvestorTransactionReports ({ commit }, params) {
        return new Promise((resolve, reject) => {
          request({
            url: customUrl + '/investor-transactions-report',
            method: 'get',
            params: {
                begin_date: params.start,
                end_date: params.end
            }
          }).then(res => {
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        })
      }
  }
}
  export default category
