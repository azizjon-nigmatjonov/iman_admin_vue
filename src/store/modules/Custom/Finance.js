import request from '@/utils/request'
const Finance = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    getPartners ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/investment/partners`,
          method: 'get',
          timeout: 10000,
          params
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getPartnerDetail ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/investment/partner/${id}`,
          method: 'get',
          timeout: 10000
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    createOrUpdatePartner ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const req = {
          url: payload && payload.id ? `/v1/investment/partner/${payload.id}` : `/v1/investment/partner`,
          method: payload && payload.id ? 'put' : 'post'
        }
        request({
          url: req.url,
          method: req.method,
          data: payload,
          timeout: 10000
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    postExpense ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/add-manual-expense`,
          method: 'post',
          data: payload,
          timeout: 10000
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getCashInOutDetail ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/gl-list/${id}`,
          method: 'get',
          timeout: 10000
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    createOrUpdateCashIn ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const req = {
          url: payload && payload.id ? `/v1/gl-list/${payload.id}/cash-in-update` : `/v1/gl/cash-in-create`,
          method: payload && payload.id ? 'put' : 'post'
        }
        request({
          url: req.url,
          method: req.method,
          data: payload,
          timeout: 10000
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    createOrUpdateCashOut ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const req = {
          url: payload && payload.id ? `/v1/gl-list/${payload.id}/cash-out-update` : `/v1/gl/cash-out-create`,
          method: payload && payload.id ? 'put' : 'post'
        }
        request({
          url: req.url,
          method: req.method,
          data: payload,
          timeout: 10000
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    createOrUpdateCashInOut ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const req = {
          url: payload && payload.id ? `/v1/gl-list/${payload.id}/cash-in-out-update` : `/v1/gl/cash-in-out-create`,
          method: payload && payload.id ? 'put' : 'post'
        }
        request({
          url: req.url,
          method: req.method,
          data: payload,
          timeout: 10000
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    updateGl ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const req = {
          url: `/v1/gl-list/${payload.guid}/gl-update`,
          method: 'put',
          data: payload
        }
        request({
          url: req.url,
          method: req.method,
          data: payload,
          timeout: 10000
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getExpenseDetail ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/expenses/${id}`,
          method: 'get'
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getExpenses ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/expenses`,
          method: 'get',
          params: params
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getIncomes ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/incomes`,
          method: 'get',
          params: params
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    postIncome ({ commit }, data) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/add-manual-income`,
          method: 'post',
          data
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getProfitDistribution ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/profit-distribution-list`,
          method: 'get',
          params: params
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getCashOutReport ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/cash-out-report`,
          method: 'get',
          params: params
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getCashInReport ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/cash-in-report`,
          method: 'get',
          params: params,
          timeout: 100000000
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getEndOfMonthList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/closing-months-list`,
          method: 'get',
          params: params
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getClosedMonthFiles ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/get-closed-month-files/${id}`,
          method: 'get'
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    sendClosedMonthRequest ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/end-of-month-create`,
          method: 'post',
          data: payload,
          timeout: 100000000
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    sendReportLeftInvestor ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/report-left-investors`,
          method: 'post',
          data: payload
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    postDelayInstallment ({ commit }, data) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/installment/create-irr-percent`,
          method: 'post',
          data
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getAccounts ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/accounts`,
          method: 'get',
          params: params
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getOperations ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/operations`,
          method: 'get',
          params: params
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getPaymentGatewaysList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/payment-gateways`,
          method: 'get',
          params
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    updateClaimsStatuses ({ commit }, data) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/claims-update-statuses`,
          method: 'put',
          data
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    }
  }
}
export default Finance
