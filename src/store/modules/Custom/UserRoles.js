import request from '@/utils/request'
const customUrl = 'v1/user-roles'
const roles = {
    state: {
      userRoles: {},
      user_types: [
        {
          name: 'System user',
          id: 'a828e458-7488-49b8-a717-c33972603704'
        },
        {
          name: 'Merchant',
          id: 'd676b3ce-26cc-41cd-9717-b076a7d2065c'
        }
      ]
    },
    getters: {
      getUserRoles: state => state.userRoles,
      getUserTypes: state => state.user_types
    },
    mutations: {
        SET_USER_ROLES (state, payload) {
            state.userRoles = payload
        }
    },
    actions: {
        getUserRoles ({ commit }, data) {
        return new Promise((resolve, reject) => {
        request({
            url: customUrl,
            method: 'get',
            params: {
              limit: 100
            }
        })
          .then(result => {
            resolve(result)
          commit('SET_USER_ROLES', result)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getUserRole ({ commit }, id) {
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
    postUserRole ({ commit }, data) {
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
    updateUserRole ({ commit }, data) {
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
  deleteUserRole ({ commit }, id) {
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
postUserRolePermission ({ commit }, data) {
    return new Promise((resolve, reject) => {
    request({
        url: `v1/user-roles/${data.user_role_id}/permissions`,
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
  getUserRolePermissions ({ commit }, id) {
    return new Promise((resolve, reject) => {
    request({
        url: `v1/user-roles/${id}/permissions`,
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
      getUserRoleScopes ({ commit }, data) {
        return new Promise((resolve, reject) => {
          request({
            url: `v1/user-role-scopes`,
            method: 'get',
            params: {
              user_role_id: data.id,
              limit: data.limit
            }
          })
            .then(result => {
              resolve(result)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      postUserRoleScopes ({ commit }, data) {
        return new Promise((resolve, reject) => {
          request({
            url: `v1/user-role-scopes`,
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
      deleteUserRoleScope ({ commit }, data) {
        return new Promise((resolve, reject) => {
          request({
            url: `/v1/user-role-scopes/${data.user_role_id}/${data.scope_id}`,
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
      getUserWithRoles ({ commit }, id) {
        return new Promise((resolve, reject) => {
          request({
            url: `/v1/user-with-role/${id}`,
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
      postUserWithRole ({ commit }, data) {
        return new Promise((resolve, reject) => {
          request({
            url: `/v1/user-with-role`,
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
      deleteUserWithRole ({ commit }, data) {
        return new Promise((resolve, reject) => {
          request({
            url: `/v1/user-with-role/${data.user_role_id}/${data.user_id}`,
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
      getScopes ({ commit }) {
        return new Promise((resolve, reject) => {
          request({
            url: `v1/scopes`,
            method: 'get',
            params: { limit: 1000 }
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
  export default roles
