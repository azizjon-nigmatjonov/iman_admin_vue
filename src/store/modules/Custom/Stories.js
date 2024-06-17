import request from '@/utils/request'
const system = {
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        patchStories ({ commit }, data) {
        return new Promise((resolve, reject) => {
        request({
            url: `v1/stories/update/${data.guid}`,
            method: 'PATCH',
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
