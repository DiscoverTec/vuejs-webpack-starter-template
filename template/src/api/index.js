import axios from 'axios'
import store from '@/store'

// default our apiUrl for tests
const apiUrl = window.config ? window.config.apiUrl : ''

// axios global requests
axios.interceptors.request.use(config => {
  config.headers['Authorization'] = 'Bearer ' + store.getters['authorization/token']
  return config
}, error => {
  return Promise.reject(error)
})

// axios global response
axios.interceptors.response.use(response => {
  return response
}, error => {
  if (apiUrl !== '') {
    console.debug(`Error Message from interceptor: ${error.message}`, error)
  }
  if (error && error.response && error.response.status === 401 && store.getters['authorization/token']) {
    store.dispatch('authorization/clearToken')
    window.location = '/login'
  }
  return Promise.reject(error)
})

// axios common base instance (resource: https://goo.gl/sDN0IN)
export default {
  get: (endpoint, data = {}, config = {}, host = apiUrl) => {
    return axios.get(`${host}/${endpoint}`, data, config)
  },
  put: (endpoint, data = {}, config = {}, host = apiUrl) => {
    return axios.put(`${host}/${endpoint}`, data, config)
  },
  post: (endpoint, data = {}, config = {}, host = apiUrl) => {
    return axios.post(`${host}/${endpoint}`, data, config)
  },
  delete: (endpoint, data = {}, config = {}, host = apiUrl) => {
    return axios.delete(`${host}/${endpoint}`, data, config)
  }
}
