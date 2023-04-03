import { TComments } from '@/types/comments'
import { api } from './instance'
import { TAxiosResponse } from './types'

export type TCommentsParams = {
  sort?: 'latest' | 'top'
}

const get = (
  id: string,
  params?: TCommentsParams
): TAxiosResponse<{
  status: number
  data: { comments: TComments[] }
}> => api.get(`videos/${id}/comments`, { params })

export const commentsApi = {
  get,
}
