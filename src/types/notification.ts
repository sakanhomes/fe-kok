export type TNotification = {
  id: string
  type: 'user.subscription' | 'user.mention' | 'video.activity'
  message: string
  params: {
    user: {
      address: string
      name: string | null
      profileImage: string
    }
    video?: {
      id: string
      previewImage: string
    }
  }
  createdAt: number
  readAt: number | null
}
