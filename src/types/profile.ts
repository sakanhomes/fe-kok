export type TProlile = {
  address: string
  name?: string
  profileImage?: string
  backgroundImage?: string
  description?: string
  balance: string
  videosAmount: number
  followersAmount: number
  followingsAmount: number
}

export type TProfileSettings = {
  [key in string]: true
}
