import { TProlile } from '@/types/profile'
import { api } from './instance'
import { TAxiosResponse } from './types'

export type TUpdateProfile = Omit<TProlile, 'balance' | 'address'>

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

export const profileApi = {
  get,
  set,
}
