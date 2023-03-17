import { ECategories } from '@/features/home/enums/categories'

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
  user: {
    address: string
    name: string
    profileImage: string
    subscribersAmount: number
    subscriptionsAmount: number
    videosAmount: number
  }
}
