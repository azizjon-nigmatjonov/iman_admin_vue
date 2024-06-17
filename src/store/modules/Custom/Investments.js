import request from '@/utils/request'
import request2 from '@/utils/request2'
const customUrl = 'v1/investments'
const investments = {
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        getInvestments ({ commit }, params) {
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
    getInvestmentPools ({ commit }, params) {
      return new Promise((resolve, reject) => {
      request({
          url: 'v1/available-portfolio-pools',
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
    getInvestment ({ e }, id) {
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
    getPortfolioInvestment ({ e }, id) {
      return new Promise((resolve, reject) => {
          request({
              url: `v1/portfolio-pool-investments/` + id,
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
    getPostings ({ e }, id) {
      return new Promise((resolve, reject) => {
          request({
              url: `v1/get-postings/` + id,
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
    getCustomerInfo ({ e }, id) {
      return new Promise((resolve, reject) => {
          request2({
              url: `v1/customers/` + id,
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
