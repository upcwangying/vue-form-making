import axios from 'axios'

const request = axios.create({
  withCredentials: false
})

request.interceptors.request.use(
  config =>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoie1wiY29kZVwiOlwiYWRtaW5cIixcIm5hbWVcIjpcIueuoeeQhuWRmFwiLFwiaWRcIjo1NyxcInR5cGVcIjoxfSIsImlzcyI6IlRQUklfRE1QIiwiZXhwIjoxNjAyMTIzMjYwfQ.Qxpo4rmgcePVXADetJVYOunAlteU7sk7prbj7ozZv1o'
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
