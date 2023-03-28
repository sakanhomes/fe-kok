import { TShortUserInfo } from '@/types/common'
import { TProlile } from '@/types/profile'
import { TMeSettings } from '@/types/settings'
import { TOwnerVideo } from '@/types/video'
import { api } from './instance'
import { TAxiosResponse } from './types'

export type TUpdateProfile = {
  name?: string
  profileImageUploadId?: string
  backgroundImageUploadId?: string
  description?: string
}

const get = (): TAxiosResponse<{
  status: number
  data: { user: TProlile }
}> => api.get('me')

const set = (
  data: TUpdateProfile
): TAxiosResponse<{
  status: number
  data: { user: TProlile }
}> => api.patch('me', data)

const setSettings = (
  data: TMeSettings
): TAxiosResponse<{
  status: number
  data: { settings: TMeSettings }
}> => api.patch('me/settings', data)

const getSettings = (): TAxiosResponse<{
  status: number
  data: { settings: TMeSettings }
}> => api.get('me/settings')

const getVideos = (): TAxiosResponse<{
  status: number
  data: { videos: TOwnerVideo[] }
}> => api.get('me/videos')

const getFavourites = (params?: {
  search?: string
}): TAxiosResponse<{
  status: number
  data: { videos: TOwnerVideo[] }
}> => api.get('me/favourites', { params })

const getSubscribers = (params?: {
  search?: string
}): TAxiosResponse<{
  status: number
  data: { users: TShortUserInfo[] }
}> => api.get('me/subscribers', { params })

const getSubscriptions = (params?: {
  search?: string
}): TAxiosResponse<{
  status: number
  data: { users: TShortUserInfo[] }
}> => api.get('me/subscriptions', { params })

export const profileApi = {
  get,
  set,
  setSettings,
  getSettings,
  getVideos,
  getSubscribers,
  getSubscriptions,
  getFavourites,
}
