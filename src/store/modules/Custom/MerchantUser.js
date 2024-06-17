import request from '@/utils/request'
import request2 from '@/utils/request2'
const customUrl = 'v1/merchants'
const customUrlPosAgents = 'v1/pos-agents'
const partners = {
    state: {
        merchant_users: [],
        posAgents: []
    },
    getters: {
      getMerchantUsers: state => state.merchant_users,
      getPosAgentsList: state => state.posAgents
    },
    mutations: {
        SET_MERCHANT_USER (state, payload) {
            state.merchant_users = payload
        }
    },
    actions: {
    getMerchantUsers ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request2({
            url: customUrl,
            method: 'get',
            params
        })
          .then(result => {
            resolve(result)
          // commit('SET_PERMISSIONS', result.permissions)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getPosAgentsList ({ commit }, params) {
      return new Promise((resolve, reject) => {
      request2({
          url: customUrlPosAgents,
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
    getPosAgent ({ commit }, { params, id }) {
      return new Promise((resolve, reject) => {
        request2({
            url: `v1/merchants${id}/agents`,
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
    postMerchantPosAgent ({ commit }, { id, data }) {
      return new Promise((resolve, reject) => {
        request2({
          url: 'v1/merchants/' + id + '/agents',
          method: 'post',
          data
        }).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    deletePosAgent ({ commit }, id) {
      return new Promise((resolve, reject) => {
        request2({
            url: customUrlPosAgents + `/${id}`,
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
    getBranchByMerchant ({ commit }, { data, id }) {
      return new Promise((resolve, reject) => {
        request2({
          url: 'v1/merchants/' + id + '/branches',
          method: 'get'
        }).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getGL ({ commit }, params) {
        return new Promise((resolve, reject) => {
        request({
            url: 'v1/gl-list',
            method: 'get',
            timeout: 1000000,
            params
        })
          .then(result => {
            resolve(result)
          // commit('SET_PERMISSIONS', result.permissions)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getGLCashInOut ({ commit }, params) {
        return new Promise((resolve, reject) => {
        request({
          url: 'v1/gl/cash-in-out-list',
          method: 'get',
          timeout: 100000,
          params
        })
          .then(result => {
            resolve(result)
          // commit('SET_PERMISSIONS', result.permissions)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getMerchantUser ({ commit }, id) {
      return new Promise((resolve, reject) => {
      request2({
          url: customUrl + '/' + id,
          method: 'get'
      })
        .then(result => {
          resolve(result)
      //   commit('SET_JOBS', result.jobs)
      })
      .catch(error => {
        reject(error)
      })
    })
  },
  getMerchanTypes ({ commit }, id) {
    return new Promise((resolve, reject) => {
    request2({
        url: '/v1/merchants/types',
        method: 'get'
    })
      .then(result => {
        resolve(result)
    //   commit('SET_JOBS', result.jobs)
    })
    .catch(error => {
      reject(error)
    })
  })
},
  getMerchantUserInvoices ({ commit }, { params, id }) {
    return new Promise((resolve, reject) => {
    request({
        url: customUrl + '/' + id + '/invoices',
        method: 'get',
        params
    })
      .then(result => {
        resolve(result)
    //   commit('SET_JOBS', result.jobs)
    })
    .catch(error => {
      reject(error)
    })
  })
},
getDiscounts ({ commit }, id) {
  return new Promise((resolve, reject) => {
  request2({
      url: 'v1/merchants' + '/' + id + '/discounts',
      method: 'get'
  })
    .then(result => {
      resolve(result)
  //   commit('SET_JOBS', result.jobs)
  })
  .catch(error => {
    reject(error)
  })
})
},
getMarkups ({ commit }, id) {
  return new Promise((resolve, reject) => {
  request2({
      url: 'v1/merchants' + '/' + id + '/markups',
      method: 'get'
  })
    .then(result => {
      resolve(result)
  //   commit('SET_JOBS', result.jobs)
  })
  .catch(error => {
    reject(error)
  })
})
},
getMerchantsOwnerInfo ({ commit }, id) {
  return new Promise((resolve, reject) => {
  request2({
      url: 'v1/merchants/' + id + '/owners',
      method: 'get'
  })
    .then(result => {
      resolve(result)
  //   commit('SET_JOBS', result.jobs)
  })
  .catch(error => {
    reject(error)
  })
})
},
postMerchantsOwnerInfo ({ commit }, data) {
  return new Promise((resolve, reject) => {
  request2({
      url: customUrl + '/' + data.merchant_id + '/owners',
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
deleteMerchantsOwner ({ commit }, data) {
  return new Promise((resolve, reject) => {
    request2({
        url: customUrl + '/' + data.merchant_id + '/owners/' + data.user_id,
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
  postMerchantUsers ({ commit }, data) {
        return new Promise((resolve, reject) => {
        request2({
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
    },
    updateMerchantUsers ({ commit }, data) {
      return new Promise((resolve, reject) => {
      request2({
          url: customUrl + '/' + data.guid,
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
  deleteMerchantUsers ({ commit }, id) {
    return new Promise((resolve, reject) => {
    request2({
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
  deleteDiscount ({ commit }, params) {
    return new Promise((resolve, reject) => {
    request2({
        url: 'v1/merchants/' + params.merchant_id + '/discounts/' + params.discunt_id,
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
  deleteMarkup ({ commit }, params) {
    return new Promise((resolve, reject) => {
    request2({
        url: 'v1/merchants/' + params.merchant_id + '/markups/' + params.markup_id,
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
  passwordSetup ({ commit }, { guid, ownerId, data }) {
    return new Promise((resolve, reject) => {
    request2({
        url: `v1/merchants/${guid}/owners/${ownerId}/password-update`,
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
  postMurkups ({ commit }, { guid, data }) {
    return new Promise((resolve, reject) => {
    request2({
        url: `v1/merchants/${guid}/markups`,
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
  postDiscounts ({ commit }, { guid, data }) {
    return new Promise((resolve, reject) => {
    request2({
        url: `v1/merchants/${guid}/discounts`,
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
      getMerchantPhones ({ commit }, id) {
        return new Promise((resolve, reject) => {
          request({
            url: `/v1/get-merchant-phones-tg/${id}`,
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
      postNewMerchantPhone ({ commit }, data) {
        return new Promise((resolve, reject) => {
          request({
            url: `/v1/new-merchant-tg-user`,
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
      deleteMerchantPhone ({ commit }, phone) {
        return new Promise((resolve, reject) => {
          request({
            url: `/v1/delete-merchant-tg-user/${phone}`,
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
  export default partners
