import { ECategories } from '@/features/home/enums/categories'
import { TShortUserInfo } from './common'

export type TVideo = {
  id: string
  category: ECategories
  title: string
  duration: string
  description?: string
  previewImage: string
  video: string
  viewsAmount: number
  likesAmount: number
  commentsAmount: number
  createdAt: number
  isPublic: boolean
  user: TShortUserInfo
  flags: {
    isLiked: boolean
  }
}

export type TOwnerVideo = Omit<TVideo, 'user'>
