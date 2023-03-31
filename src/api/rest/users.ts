import { TShortUserInfo, TUsersFlags } from '@/types/common'
import { TOwnerPlaylist } from '@/types/playlists'
import { TProlile } from '@/types/profile'
import { TVideo } from '@/types/video'
import { api } from './instance'
import { TAxiosResponse } from './types'

const get = (params?: {
  search?: string
}): TAxiosResponse<{
  status: number
  data: { users: TProlile[] }
}> => api.get('users', { params })

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

const getCollection = (
  id: string,
  address: string
): TAxiosResponse<{
  status: number
  data: { playlist: TOwnerPlaylist }
}> => api.get(`users/${address}/playlists/${id}`)

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
  getCollection,
  removeSubscribe,
}
