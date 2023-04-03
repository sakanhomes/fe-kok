import { TShortUserInfo } from './common'

export type TReply = {
  id: string
  content: string
  likesAmount: number
  dislikesAmount: number
  repliesAmount: number
  user: TShortUserInfo
}

export type TComments = {
  id: string
  content: string
  likesAmount: string
  dislikesAmount: string
  createdAt: number
  repliesAmount: string
  user: TShortUserInfo
  flags: {
    isLiked: boolean
    isDisliked: boolean
  }
  repliedComment?: TReply
}
