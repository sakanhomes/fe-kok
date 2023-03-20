import { ECategories } from '@/features/home/enums/categories'
import { TVideo } from '@/types/video'
import { api } from './instance'
import { TAxiosResponse } from './types'

export type TUpdateVideoReq = {
  isPublic: boolean
}

export type TVideosReq = {
  amount: number
  category?: ECategories
}

const getRandom = (
  params: TVideosReq
): TAxiosResponse<{
  status: number
  data: { videos: TVideo[] }
}> => api.get('videos/random', { params })

const getVideo = (
  id: string
): TAxiosResponse<{
  status: number
  data: { video: TVideo }
}> => api.get(`videos/${id}`)

const updateVideo = (
  id: string,
  params: TUpdateVideoReq
): TAxiosResponse<{
  status: number
  data: { video: TVideo }
}> => api.patch(`videos/${id}`, params)

const setLike = (
  id: string
): TAxiosResponse<{ status: number; data: { video: TVideo } }> =>
  api.post(`videos/${id}/likes`)

const deleteLike = (
  id: string
): TAxiosResponse<{ status: number; data: { video: TVideo } }> =>
  api.delete(`videos/${id}/likes`)

const getViewed = (
  id: string
): TAxiosResponse<{ status: number; data: { video: TVideo } }> =>
  api.post(`videos/${id}/viewed`)

export const videosApi = {
  getRandom,
  getVideo,
  updateVideo,
  setLike,
  deleteLike,
  getViewed,
}
