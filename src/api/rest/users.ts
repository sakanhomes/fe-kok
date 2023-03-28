import { TShortUserInfo, TUsersFlags } from '@/types/common'
import { TProlile } from '@/types/profile'
import { TVideo } from '@/types/video'
import { api } from './instance'
import { TAxiosResponse } from './types'

const get = (): TAxiosResponse<{
  status: number
  data: { users: TProlile[] }
}> => api.get('users')

const getByAddress = (
  address: string
): TAxiosResponse<{
  status: number
  data: { user: TProlile }
}> => api.get(`users/${address}`)

const getFlags = (
  address: string
): TAxiosResponse<{
  status: number
  data: { flags: TUsersFlags }
}> => api.get(`users/${address}/flags`)

const getUserVideos = (
  address: string
): TAxiosResponse<{
  status: number
  data: { videos: TVideo<never>[] }
}> => api.get(`users/${address}/videos`)

const setSubscribe = (
  address: string
): TAxiosResponse<{
  status: number
  data: { user: TShortUserInfo }
}> => api.post(`users/${address}/subscriptions`)

const removeSubscribe = (
  address: string
): TAxiosResponse<{
  status: number
  data: { user: TShortUserInfo }
}> => api.delete(`users/${address}/subscriptions`)

export const usersApi = {
  get,
  getByAddress,
  getFlags,
  getUserVideos,
  setSubscribe,
  removeSubscribe,
}
