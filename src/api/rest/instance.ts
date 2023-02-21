import axios, { AxiosInstance } from 'axios'
import { ERROR_MESSAGE, ERROR_STATUS } from '@/constants/error-status'
import { API_REST_URL, AXIOS_TIMEOUT } from '@/constants/config'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { actionsAsync, actionsAsync as userActionsAsync } from '@/containers/user'
import { actions, actions as errorsActions } from '@/containers/errors'
import { TStore } from '@/store'
import { isClient } from '@/utils/isClient'
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

export const api: AxiosInstance = axios.create(axiosBaseConfig)

// refresh token
const refreshAuthLogic = async () =>
  axios
    .get('auth/refresh', axiosBaseConfig)
    .then(() => Promise.resolve())
    .catch((error) => {
      store.dispatch(userActionsAsync.logout())
      return Promise.reject(error)
    })

// request handler
api.interceptors.request.use((request) => ({
  ...request,
  headers: { ...request.headers, 'Accept-Language': locale.get() },
}))

// response handler
api.interceptors.response.use(
  (response) =>
    // do something
    response,
  (error) => {
    if (!error.response && error.message === ERROR_MESSAGE.NETWORK) {
      store.dispatch(errorsActions.setNetworkError(true))
      return Promise.reject({})
    }

    if (!error.response) {
      return Promise.reject({})
    }

    const { status } = error.response

    if (status === ERROR_STATUS.FORBIDDEN) {
      return store.dispatch(actionsAsync.logout())
    }

    if (isClient() && status >= ERROR_STATUS.SERVER) {
      store.dispatch(actions.setPageError(ERROR_STATUS.SERVER))
    }

    return Promise.reject(error)
  }
)

createAuthRefreshInterceptor(api, refreshAuthLogic, {
  statusCodes: [ERROR_STATUS.UNAUTHORIZED],
})
