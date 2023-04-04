import { TComments } from '@/types/comments'
import { api } from './instance'
import { TAxiosResponse } from './types'

export type TCommentsParams = {
  sort?: 'latest' | 'top'
}

export type TPostComment = {
  content: string
  repliedCommentId?: string
}

const get = (
  id: string,
  params?: TCommentsParams
): TAxiosResponse<{
  status: number
  data: { comments: TComments[] }
}> => api.get(`videos/${id}/comments`, { params })

const post = (
  id: string,
  data?: TPostComment
): TAxiosResponse<{
  status: number
  data: { comments: TComments[] }
}> => api.post(`videos/${id}/comments`, data)

const setLike = (
  id: string,
  commentId: string
): TAxiosResponse<{
  status: number
  data: { comments: TComments[] }
}> => api.post(`videos/${id}/comments/${commentId}/likes`)

const removeLike = (
  id: string,
  commentId: string
): TAxiosResponse<{
  status: number
  data: { comments: TComments[] }
}> => api.delete(`videos/${id}/comments/${commentId}/likes`)

const setDislike = (
  id: string,
  commentId: string
): TAxiosResponse<{
  status: number
  data: { comments: TComments[] }
}> => api.post(`videos/${id}/comments/${commentId}/dislikes`)

const removeDislike = (
  id: string,
  commentId: string
): TAxiosResponse<{
  status: number
  data: { comments: TComments[] }
}> => api.delete(`videos/${id}/comments/${commentId}/dislikes`)

export const commentsApi = {
  get,
  post,
  setLike,
  setDislike,
  removeDislike,
  removeLike,
}
