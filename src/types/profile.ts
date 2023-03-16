export type TProlile = {
  address: string
  name?: string
  profileImage?: string
  backgroundImage?: string
  description?: string
  balance: string
  videosAmount: number
  subscribersAmount: number
  subscriptionsAmount: number
}

export type TProfileSettings = {
  [key in string]: true
}
