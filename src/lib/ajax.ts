import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useLoadingStore } from '../stores/useLoadingStore'

// 静态配置项直接用 defaults 配置
axios.defaults.baseURL = isDev ? '/' : 'http://121.196.236.94:8080/'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000

// 动态配置项用拦截器来配置
axios.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt') || ''
  config.headers = config.headers || {}
  if (jwt) { config.headers.Authorization = `Bearer ${jwt}` }
  return config
})

type Options = {
  showLoading?: boolean
  handleError?: boolean
}
export const useAjax = (options?: Options) => {
  const table: Record<string, undefined | (() => void)> = {
    401: () => {
      nav('/sign_in')
    },
    402: () => {
      window.alert('请付费后观看')
    },
    403: () => {
      window.alert('没有权限')
    }
  }
  const showLoading = options?.showLoading || false
  const handleError = options?.handleError ?? true
  const { setVisible } = useLoadingStore()
  const nav = useNavigate()
  const onError = (error: AxiosError) => {
    if (error.response) {
      if (handleError) {
        const { status } = error.response
        const fn = table[status]
        fn?.()
      }
    }
    throw error
  }
  const ajax = {
    get: <T>(path: string, config?: AxiosRequestConfig<any>) => {
      if (showLoading) { setVisible(true) }
      return axios.get<T>(path, config).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    post: <T>(path: string, data: JSONValue) => {
      if (showLoading) { setVisible(true) }
      return axios.post<T>(path, data).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    patch: <T>(path: string, data: JSONValue) => {
      if (showLoading) { setVisible(true) }
      return axios.patch<T>(path, data).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    destroy: <T>(path: string) => {
      if (showLoading) { setVisible(true) }
      return axios.delete<T>(path).catch(onError).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
  }
  return ajax
}
