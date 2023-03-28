import { TOwnerVideo, TVideo } from './video'

export type TPlaylist = {
  id: string
  isDefault: boolean
  videos: TVideo[]
}

export type TOwnerPlaylist = {
  id: string
  isDefault: boolean
  videos: TOwnerVideo[]
}
