import { ECategories } from '@/features/home/enums/categories'
import { TOwnerVideo, TVideo } from '@/types/video'
import { api } from './instance'
import { TAxiosResponse } from './types'

export type TUpdateVideoReq = {
  isPublic: boolean
}

export type TVideosReq = {
  amount: number
  category?: ECategories
}

export type TVideoCreateReq = {
  title: string
  description: string
  category: ECategories
  duration: number
  isPublic: boolean
  videoUploadId: string
  previewUploadId: string
}

const getRandom = (
  params: TVideosReq
): TAxiosResponse<{
  status: number
  data: { videos: TVideo[] }
}> => api.get('videos/random', { params })

const getTranding = (
  params: TVideosReq
): TAxiosResponse<{
  status: number
  data: { videos: TVideo[] }
}> => api.get('videos/trending', { params })

const getVideo = (
  id: string
): TAxiosResponse<{
  status: number
  data: { video: TVideo }
}> => api.get(`videos/${id}`)

const createVideo = (
  params: TVideoCreateReq
): TAxiosResponse<{
  status: number
  data: { video: TOwnerVideo }
}> => api.post(`videos`, params)

const updateVideo = (
  id: string,
  params: TUpdateVideoReq
): TAxiosResponse<{
  status: number
  data: { video: TVideo }
}> => api.patch(`videos/${id}`, params)

const deleteVideo = (
  id: string
): TAxiosResponse<{
  status: number
}> => api.delete(`videos/${id}`)

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
  deleteVideo,
  setLike,
  deleteLike,
  getViewed,
  createVideo,
  getTranding,
}
