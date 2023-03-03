import { TSettings } from '@/types/settings'
import { api } from './instance'
import { TAxiosResponse } from './types'

const get = (): TAxiosResponse<{
  status: number
  data: { settings: TSettings }
}> => api.get('settings')

export const settingsApi = {
  get,
}
