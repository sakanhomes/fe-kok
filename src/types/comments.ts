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
  likesAmount: number
  dislikesAmount: number
  createdAt: number
  repliesAmount: number
  user: TShortUserInfo
  flags: {
    isLiked: boolean
    isDisliked: boolean
  }
  repliedComment?: TReply
}
