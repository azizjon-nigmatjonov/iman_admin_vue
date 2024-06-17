import request from '@/utils/request'
const customUrl = 'v1/catalogues'
const catalogue = {

    actions: {
      getDistricts ({ commit }, params) {
        return new Promise((resolve, reject) => {
        request({
            url: customUrl + '/' + 'districts',
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

    getRegions ({ commit }) {
      return new Promise((resolve, reject) => {
        request({
          url: customUrl + '/' + 'regions',
          method: 'get'
        }).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
  export default catalogue
