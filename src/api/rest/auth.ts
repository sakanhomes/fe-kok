import { api } from './instance'
import { TAxiosResponse } from './types'

export type TLoginReq = {
  address: string
  signature: string
}

const nonce = (
  address: TLoginReq['address']
): TAxiosResponse<{
  status: number
  data: { nonce: string }
}> => api.post('auth/nonce', { address })

const login = (
  data: TLoginReq
): TAxiosResponse<{
  status: number
}> => api.post('auth/login', data)

const refresh = (): TAxiosResponse<{
  status: number
}> => api.post('auth/refresh')

const logout = (): TAxiosResponse<{
  status: number
}> => api.post('auth/refresh')

export const authApi = {
  nonce,
  login,
  refresh,
  logout,
}
