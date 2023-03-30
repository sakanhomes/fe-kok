import axios, { AxiosInstance } from 'axios'
import { isClient } from '@/utils/isClient'
import { ERROR_STATUS } from '@/constants/error-status'
import { TStore } from '@/store'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { API_REST_URL, AXIOS_TIMEOUT } from '@/constants/config'
import { actionsAsync } from 'store/auth'
import { actions } from '@/containers/errors'
import { locale } from '../browser-api/locale'

let store = {} as TStore

export const injectStore = (_store: TStore): void => {
  store = _store
}

const axiosBaseConfig = {
  baseURL: API_REST_URL,
  timeout: AXIOS_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': locale.get(),
  },
  withCredentials: true,
}

// eslint-disable-next-line import/no-mutable-exports
export let cancelTokenSource = axios.CancelToken.source()

export const resetCancelToken = (): void => {
  cancelTokenSource.cancel()
  const newCancelTokenSource = axios.CancelToken.source()
  cancelTokenSource = newCancelTokenSource
}

export const api: AxiosInstance = axios.create(axiosBaseConfig)

const refreshAuthLogic = async () =>
  axios
    .post('/auth/refresh', {}, axiosBaseConfig)
    .then(() => Promise.resolve())
    .catch((e) => {
      if (!axios.isAxiosError(e) || !e.response) return
      store.dispatch(actionsAsync.logout())
      return Promise.reject(e)
    })

// request handler
api.interceptors.request.use((request) => ({
  ...request,
  headers: { ...request.headers, 'Accept-Language': locale.get() },
}))

// response handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        response: {
          status: null,
          data: {},
          canceled: axios.isCancel(error),
        },
      })
    }

    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    if (!error.response) {
      return Promise.reject({})
    }

    const { status, data } = error.response

    if (axios.isAxiosError(error) && isClient() && status >= ERROR_STATUS.SERVER) {
      store.dispatch(actions.showGlobalError(data.message))
      return Promise.reject({})
    }

    return Promise.reject(error)
  }
)

createAuthRefreshInterceptor(api, refreshAuthLogic, {
  statusCodes: [ERROR_STATUS.UNAUTHORIZED],
})
