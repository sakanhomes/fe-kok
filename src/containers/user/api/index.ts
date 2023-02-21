import { TAxiosResponse } from '@/api/rest/types'
import { api } from '@/api/rest/instance'
import { TUser } from '../types'

const getProfile = (): TAxiosResponse<TUser> => api.get('/user/profile')

const logout = (): TAxiosResponse<unknown> => api.delete('/auth/logout')

export const apiUser = {
  getProfile,
  logout,
}
