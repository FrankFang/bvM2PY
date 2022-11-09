import axios from 'axios'

axios.defaults.baseURL = isDev ? '/' : 'http://121.196.236.94:8080/api/v1'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000

export const ajax = {
  get: <T>(path: string) => {
    return axios.get<T>(path)
  },
  post: () => { },
  patch: () => { },
  delete: () => { },
}
