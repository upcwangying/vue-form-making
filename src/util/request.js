import axios from 'axios'
import { getToken } from '@/util/auth'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false
})

request.interceptors.request.use(
  config => {
    const token = getToken()
    config.headers["Authorization"] = `Bearer ${token}`
    return config
  },
  error => {
    return Promise.reject(new Error(error).message)
  }
)

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(new Error(error).message)
  }
)

export default request
