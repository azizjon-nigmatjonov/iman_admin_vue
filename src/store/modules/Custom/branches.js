import request from '@/utils/request'
import request2 from '@/utils/request2'
const customUrl = 'v1/merchant-branches'
const category = {
    state: {
        branches: []
    },
    getters: {
      getBranches: state => state.branches
    },
    mutations: {
        SET_BRANCHES (state, payload) {
            state.branches = payload
        }
    },
    actions: {
      getBranches ({ commit }, params) {
        return new Promise((resolve, reject) => {
        request({
            url: customUrl,
            method: 'get',
            params
        })
          .then(result => {
          commit('SET_CATEGORIES', result.branches)
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getBranch ({ commit }, id) {
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
    },
    getNewBranch ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request2({
          url: 'v1/merchants/' + params.id + '/branches/' + params.branch_id,
          method: 'get'
        }).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    postBranch ({ commit }, data) {
      return new Promise((resolve, reject) => {
      request2({
          url: 'v1/merchants/' + data.merchant_id + '/branches',
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
  updateBranch ({ commit }, data) {
    return new Promise((resolve, reject) => {
    request2({
        url: 'v1/merchants/' + data.merchant_id + '/branches/' + data.guid,
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
  deleteBranch ({ commit }, data) {
  return new Promise((resolve, reject) => {
    request2({
        url: 'v1/merchants/' + data.merchant_id + '/branches/' + data.branch_id,
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
  export default category
