import request from '@/utils/request'
const customUrl = 'v1/pos-agents'
const category = {
    state: {
        posAgents: []
    },
    getters: {
      getPosAgents: state => state.posAgents
    },
    mutations: {
        SET_POSAGENTS (state, payload) {
            state.posAgents = payload
        }
    },
    actions: {
        getPosAgents ({ commit }, params) {
        return new Promise((resolve, reject) => {
        request({
            url: customUrl,
            method: 'get',
            params
        })
          .then(result => {
          commit('SET_CATEGORIES', result.posAgents)
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getPosAgent ({ commit }, id) {
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
    postPosAgents ({ commit }, data) {
      return new Promise((resolve, reject) => {
      request({
          url: customUrl,
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
  updatePosAgents ({ commit }, data) {
    return new Promise((resolve, reject) => {
    request({
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
  deletePosAgents ({ commit }, id) {
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
updatePosAgentsAcount ({ commit }, data) {
    return new Promise((resolve, reject) => {
    request({
        url: customUrl + '/' + data.id + '/account-status',
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
postPosAgentsAccount ({ commit }, data) {
    return new Promise((resolve, reject) => {
    request({
        url: customUrl + '/' + data.id + '/accounts',
        method: 'post',
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
deletePosAgentsAccount ({ commit }, data) {
    return new Promise((resolve, reject) => {
      request({
          url: customUrl + '/' + data.id + '/accounts',
          method: 'delete',
          data: data.data
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
