import request from '@/utils/request'
const Wings = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    getWingsList ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/wings-requests`,
          method: 'get',
          params: params
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    getInquiryData ({ commit }, { params, id }) {
      return new Promise((resolve, reject) => {
        request({
          url: `/v1/wings-requests/${id}`,
          method: 'get',
          params: params
        })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    }
  }
}
export default Wings
