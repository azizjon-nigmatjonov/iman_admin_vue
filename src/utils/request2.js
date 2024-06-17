import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN_2 } from '@/store/mutation-types'

console.log('process point:', process)
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL_2,
  // baseURL: process.env.VUE_APP_LINUX_URL,
  timeout: 12000000
})
export const downloadfile = axios.create({
  baseURL: process.env.VUE_APP_VARIABLE,
  responseType: 'blob'
})

// 异常拦截处理器
const errorHandler = (error) => {
  // notification.error({
  //   message: error.response.status,
  //   description: error.response.data.message
  // })
  store.commit('SET_LOADING', false)
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN_2)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        const data = {
          refresh_token: JSON.parse(localStorage.getItem('refresh_token_2'))
        }
        store.dispatch('refreshToken2', data).then((res) => {
          console.log(res)
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        }).catch(error => {
          console.log(error)
          // store.dispatch('Logout2').then(() => {
          //   setTimeout(() => {
          //     window.location.reload()
          //   }, 1500)
          // })
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  store.commit('SET_LOADING', true)
  const token = storage.get(ACCESS_TOKEN_2)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
    // config.headers['client-id'] = storage.get('client_id')
  }
  return config
}, errorHandler)
downloadfile.interceptors.request.use(config => {
  store.commit('SET_LOADING', true)
  const token = storage.get(ACCESS_TOKEN_2)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
    // config.headers['client-id'] = storage.get('client_id')
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  store.commit('SET_LOADING', false)
  return response.data
}, errorHandler)
downloadfile.interceptors.response.use((response) => {
  store.commit('SET_LOADING', false)
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
