import { TVideo } from './video'

export type THistory = {
  [key in string]: TVideo[]
}
