export type TVideo = {
  id: string
  category: string
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
    followersAmount: number
    followingsAmount: number
    videosAmount: number
  }
}
