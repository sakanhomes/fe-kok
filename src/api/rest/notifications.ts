import { TNotification } from '@/types/notification'
import { api } from './instance'
import { TAxiosResponse } from './types'

const get = (params: {
  limit: number
}): TAxiosResponse<{
  status: number
  data: { notifications: TNotification[] }
}> => api.get('notifications', { params })

const readAll = (): TAxiosResponse<{
  status: number
}> => api.post('notifications/read/all')

export const notificationsApi = {
  get,
  readAll,
}
