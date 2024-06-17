import { ACCESS_TOKEN, ACCESS_TOKEN_2 } from '@/store/mutation-types'
import request from '@/utils/request'
import request2 from '@/utils/request2'
import storage from 'store'
const customUrl = 'v1/system-users/'
const auth = {
    state: {
      token: {},
      userInfo: storage.get('system_user_iman') || '',
      loader: false
    },
    getters: {
      getTokenInfo: state => state.token
    },
    mutations: {
        SET_TOKEN (state, payload) {
            state.token = payload
        },
        SET_USER_INFO (state, payload) {
          state.userInfo = payload
        },
        SET_LOADING (state, payload) {
          state.loader = payload
        }
    },
    actions: {
    loginBySystemUser ({ commit }, data) {
        return new Promise((resolve, reject) => {
          request({
            url: customUrl + 'login',
            method: 'post',
            data
        })
          .then(result => {
            console.log('res', result)
            commit('SET_TOKEN', result.access_token)
            commit('SET_USER_INFO', result)
            storage.set('system_user_iman', JSON.stringify(result))
            storage.set(ACCESS_TOKEN, `${result.access_token}`)
            storage.set('refresh_token', result.refresh_token)
            resolve(result)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    loginBySystemUserSecond ({ commit }, data) {
      return new Promise((resolve, reject) => {
        request2({
          url: customUrl + 'login',
          method: 'post',
          data
      })
        .then(result => {
          commit('SET_TOKEN_2', result.access_token)
          commit('SET_USER_INFO_2', result)
          storage.set('system_user_iman_2', JSON.stringify(result))
          storage.set(ACCESS_TOKEN_2, `${result.access_token}`)
          storage.set('refresh_token_2', result.refresh_token)
          resolve(result)
      })
      .catch(error => {
        reject(error)
      })
    })
  },
refreshToken ({ commit }, data) {
  return new Promise((resolve, reject) => {
    request({
        url: customUrl + 'refresh-token',
        method: 'post',
        data
    })
      .then(result => {
        commit('SET_TOKEN', result.access_token)
        storage.set(ACCESS_TOKEN, `${result.access_token}`)
        storage.set('refresh_token', result.refresh_token)
        resolve(result)
    })
    .catch(error => {
      reject(error)
    })
  })
},
refreshToken2 ({ commit }, data) {
  return new Promise((resolve, reject) => {
  request2({
      url: customUrl + 'refresh-token',
      method: 'post',
      data
  })
    .then(result => {
      commit('SET_TOKEN_2', result.access_token)
      storage.set(ACCESS_TOKEN_2, `${result.access_token}`)
      storage.set('refresh_token_2', result.refresh_token)
      resolve(result)
  })
  .catch(error => {
    reject(error)
  })
})
}

  }
}
  export default auth
