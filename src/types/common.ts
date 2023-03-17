export type TShortUserInfo = {
  address: string
  name: string
  profileImage: string
  subscribersAmount: number
  subscriptionsAmount: number
  videosAmount: number
}

export type TLeaderboard = {
  month: TShortUserInfo[]
  year: TShortUserInfo[]
}
