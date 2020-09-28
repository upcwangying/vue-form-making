import axios from 'axios'
const Qs = require('querystring')
import qs from "qs";
import { getToken } from '@/util/auth'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "x-requested-with": "XMLHttpRequest"
  },
  // 请求预处理函数 可以把你传的param进行处理
  transformRequest: [
    data => {
      return Qs.stringify(data);
    }
  ],
  paramsSerializer: params => {
    return qs.stringify(params, { indices: false });
  }
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
