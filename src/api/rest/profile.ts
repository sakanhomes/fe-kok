import { TProlile } from '@/types/profile'
import { TMeSettings } from '@/types/settings'
import { api } from './instance'
import { TAxiosResponse } from './types'

export type TUpdateProfile = {
  name?: string
  profileImage?: string
  backgroundImage?: string
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

export const profileApi = {
  get,
  set,
  setSettings,
  getSettings,
}
