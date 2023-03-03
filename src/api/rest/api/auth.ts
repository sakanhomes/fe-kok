import { api } from '@/api/rest/instance'
import { TAxiosResponse } from '@/api/rest/types'

export type TLoginReq = {
  address: `0x${string}`
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

const logout = (): TAxiosResponse<{
  status: number
}> => api.post('auth/logout')

export const authApi = {
  nonce,
  login,
  logout,
}
