import request from '@/utils/request'
const customUrl = 'v1/investors'
const investorPhoneNumberUrl = 'v1/update-phone'
const investments = {
    state: {
      hasInvestment: true
    },
    getters: {
      investmentStatus: state => state.hasInvestment
    },
    mutations: {
      HAS_INVESTMENT: (state, payload) => {
        state.hasInvestment = payload
      }
    },
    actions: {
      hasInvestmentFunction ({ commit }, status) {
        commit('HAS_INVESTMENT', status)
      },
        getInvestors ({ commit }, params) {
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
    getInvestorsByPhone ({ commit }, phone) {
      return new Promise((resolve, reject) => {
        request({
            url: `${customUrl}-search/${phone}`,
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
    getInvestor ({ commit }, id) {
        return new Promise((resolve, reject) => {
            request({
                url: `${customUrl}/${id}`,
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
    getInvestorCertificates ({ commit }, id) {
        return new Promise((resolve, reject) => {
            request({
                url: `v1/investor-certificates/${id}`,
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
    getInvestorClaims ({ commit }, id) {
        return new Promise((resolve, reject) => {
            request({
                url: `${customUrl}/${id}/claims`,
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
    getInvestorBalance ({ commit }, id) {
      return new Promise((resolve, reject) => {
          request({
              url: `${customUrl}/${id}` + '/balance',
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
    getInvestorInvestments ({ commit }, id) {
      return new Promise((resolve, reject) => {
          request({
              url: `${customUrl}/${id}` + '/investments',
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
  updateInvestorStatus ({ commit }, payload) {
    return new Promise((resolve, reject) => {
        request({
            url: `${customUrl}/update-statuses`,
            method: 'post',
            data: payload
        })
          .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
      })
  },
  updateInvestor ({ commit }, { id, data }) {
    return new Promise((resolve, reject) => {
        request({
            url: `${customUrl}/${id}` + '/update',
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
  updateInvestorPhone ({ commit }, { id, data }) {
    return new Promise((resolve, reject) => {
        request({
            url: `${investorPhoneNumberUrl}/${id}`,
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
    fillInvestor ({ commit }, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
          request({
              url: `${customUrl}/${payload.id}` + '/refill-balance',
              method: 'put',
              data: payload.amount
          })
            .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
        })
  },
  widthdrawInvestor ({ commit }, payload) {
    return new Promise((resolve, reject) => {
        request({
            url: `${customUrl}/${payload.id}` + '/withdraw-balance',
            method: 'put',
            data: payload.amount
        })
          .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
      })
},
getInvestorTransaction ({ commit }, params) {
  return new Promise((resolve, reject) => {
      request({
          url: `${customUrl}/${params.id}` + '/transactions',
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
    deleteInvestor ({ commit }, id) {
      return new Promise((resolve, reject) => {
          request({
              url: `${customUrl}/${id}`,
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
      getInvestorCards (_, { id, params }) {
        return request({
          url: `/v1/investor-cards/${id}`,
          method: 'get',
          params
        })
      },
      getInvestorCard (_, id) {
        return request({
          url: `v1/get-investor-card/${id}`,
          method: 'get'
        })
      },
      getInvestorLogs (_, { id, params }) {
        return request({
          url: `/v1/investor/${id}/logs`,
          method: 'get',
          params
        })
      },
      getInvestorEditedList (_, params) {
        return new Promise((resolve, reject) => {
          request({
              url: `/v1/investor-edited-list`,
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
      getInvestorNewData (_, id) {
        return new Promise((resolve, reject) => {
          request({
              url: `/v1/get-investor-data/${id}`,
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
      confirmInvestorData (_, id) {
        return new Promise((resolve, reject) => {
          request({
              url: `/v1/investors/confirm-investor-passport/${id}`,
              method: 'post'
          })
            .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
        })
      },
      deleteInvestorData (_, id) {
        return new Promise((resolve, reject) => {
          request({
              url: `/v1/delete-investor-data/${id}`,
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
      getAutoInvests (_, investorId) {
        return new Promise((resolve, reject) => {
          request({
              url: `/v1/auto-invest/${investorId}`,
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
  export default investments
