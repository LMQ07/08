import axios from 'axios'
import { Message } from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(

)

// response interceptor
service.interceptors.response.use(
  (response) => {
    console.log(response)
    if (!response.data.success) {
      Message.error(response.data.msg)
      return Promise.reject(response.data.msg)
    }
    return response
  }, (error) => {
    Message.error(error)
    return Promise.reject(error)
  }
)

export default service
