export type TShortUserInfo = {
  address: string
  name?: string
  profileImage?: string
  backgroundImage?: string
  description?: string
  subscribersAmount: number
  subscriptionsAmount: number
  videosAmount: number
}

export type TLeaderboard = {
  month: TShortUserInfo[]
  year: TShortUserInfo[]
}

export type TUsersFlags = {
  isSubscribed: boolean
}
