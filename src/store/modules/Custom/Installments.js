import request from '@/utils/request'
import request2 from '@/utils/request2'
const customUrl = 'v1/installments'
const Installments = {
  state: {
    scoring: []
  },
  getters: {
    getScoring: state => state.scoring
  },
  mutations: {
    SET_SCORING (state, payload) {
      state.scoring = payload
    }
  },
  actions: {
    getInstallmentTransactions ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `v1/installment-payment/${id}`,
          method: 'get'
        })
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    addNewContract ({ commit }, { id, guid, data }) {
      return new Promise((resolve, reject) => {
        request({
          url: `v1/customers/${id}/installments/${guid}/add-contracts`,
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
    createInstallmentTransaction (_, data) {
      return new Promise((resolve, reject) => {
        request({
          url: `v1/installment/create-transaction`,
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
    getInstallmentList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: customUrl,
          method: 'get',
          params: params
        })
          .then(result => {
            // commit('SET_SCORING', result.scoring)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // application
    getInstallmentListApp ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request2({
          url: customUrl + '/' + 'applications',
          method: 'get',
          params: params
        })
          .then(result => {
            // commit('SET_SCORING', result.scoring)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getSingleScoringApp ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request2({
          url: `${customUrl}/applications/${id}`,
          method: 'get'
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getApplicationProducts ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request2({
          url: `v1/installments/applications/${id}/baskets`,
          method: 'get'
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    // sale start
    getInstallmentTransactionsSale ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request2({
          url: `${customUrl}/${id}/transactions`,
          method: 'get'
        })
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    postNewTransaction ({ commit }, data) {
      return new Promise((resolve, reject) => {
        request2({
          url: `v1/payments/bank-transaction`,
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
    getInstallmentListSale ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request2({
          url: customUrl + '/' + 'installments',
          method: 'get',
          params: params
        })
          .then(result => {
            // commit('SET_SCORING', result.scoring)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getRepaymentScheduleSale ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request2({
          url: `/v1/installments/${id}/payment-schedule`,
          method: 'get'
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getSaleProducts ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request2({
          url: `v1/installments/${id}/baskets`,
          method: 'get'
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getInstallmentSaleCustomerFiles ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request2({
          url: `v1/installments/${id}/attachments`,
          method: 'get'
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getCustomerByPassportNumber ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request2({
          url: '/v1/customers/customer-id/' + params.passport_number,
          method: 'get'
        })
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getCustomerListForInstallments ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request2({
          url: '/v1/customers',
          method: 'get',
          params: params
        })
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getInstallSalementStatuses ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request2({
          url: customUrl + '/applications/statuses',
          method: 'get',
          params: params
        })
          .then(result => {
            // commit('SET_SCORING', result.scoring)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // sale end
    getInstallmentSearch ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: 'v1/search-installments',
          method: 'get',
          params: params,
          timeout: 10000
        })
          .then(result => {
            // commit('SET_SCORING', result.scoring)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getKatchDetails ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `v1/installments/${id}/katm-details`,
          method: 'get'
        })
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    acceptScoring ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: customUrl + '/' + id + '/accept',
          method: 'put'
        })
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    addInvoice ({ commit }, data) {
      return new Promise((resolve, reject) => {
        request({
          url: customUrl + '/' + data.id + '/add-invoice',
          method: 'put',
          data: data.data
        })
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    startScoring ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: customUrl + '/' + id + '/scoring',
          method: 'put'
        })
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    rejectScoring ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: customUrl + '/' + id + '/reject',
          method: 'put'
        })
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getSingleScoringNew ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `v1/installment-products/${id}`,
          method: 'get'
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getSingleScoring ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request2({
          url: `${customUrl}/${id}`,
          method: 'get'
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getInstallmentCustomerFiles ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `v1/installment-customer-attachments/${id}`,
          method: 'get'
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    scoreInstallment ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: customUrl + '/' + id,
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
    getRepaymentSchedule ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/bonds/${id}/repayment-schedule`,
          method: 'get'
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    editRepaymentSchedule (_, payload) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/edit-repayment-schedule/${payload.id}`,
          method: 'put',
          data: payload.data
        }).then(res => resolve(res)).catch(error => reject(error))
      })
    },
    getApplicationLogs ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/bonds/${id}/logs`,
          method: 'get'
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getApplicationStatuses ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request2({
          url: `${customUrl}/applications/statuses`,
          method: 'get',
          params: params
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    updateApplicationStatus ({ commit }, { data, id }) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/bonds/${ id }/change-status`,
          method: 'put',
          data: data
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    }
  }
}
export default Installments
