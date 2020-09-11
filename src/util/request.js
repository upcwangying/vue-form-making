import axios from 'axios'

const request = axios.create({
  withCredentials: false
})

request.interceptors.request.use(
  config =>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoie1wiY29kZVwiOlwiYWRtaW5cIixcIm5hbWVcIjpcIueuoeeQhuWRmFwiLFwiaWRcIjo1NyxcInR5cGVcIjoxfSIsImlzcyI6IlRQUklfRE1QIiwiZXhwIjoxNjAyMjkxOTE2fQ.tVDYdqGPZbGDSVMMZjepVKv19S1wm8t0qNhJtG2ypVM'
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
