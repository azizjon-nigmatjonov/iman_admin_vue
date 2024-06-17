import request from '@/utils/request'
import request2 from '@/utils/request2'
const customUrl = 'v1/system-users'
const system = {
    state: {
        system_users: []
    },
    getters: {
      getSystemUser: state => state.system_users
    },
    mutations: {
        SET_SYSTEM_USER (state, payload) {
            state.system_users = payload
        }
    },
    actions: {
        getSystemUsers ({ commit }, params) {
        return new Promise((resolve, reject) => {
        request({
            url: customUrl,
            method: 'get',
            params
        })
          .then(result => {
            resolve(result)
          // commit('SET_SYSTEM_USER', result.system_users)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getSystemUser ({ commit }, id) {
      return new Promise((resolve, reject) => {
      request({
          url: customUrl + '/' + id,
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
    postSystemUser ({ commit }, data) {
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
    updateSystemUser ({ commit }, data) {
      return new Promise((resolve, reject) => {
      request({
          url: customUrl + '/' + data.id,
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
  deleteSystemUser ({ commit }, id) {
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
patchPassword ({ commit }, data) {
  return new Promise((resolve, reject) => {
    request2({
      url: customUrl + '/change-password',
      method: 'patch',
      data
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
  export default system
