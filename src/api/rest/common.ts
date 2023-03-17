import { TLeaderboard } from '@/types/common'
import { api } from './instance'
import { TAxiosResponse } from './types'

const leaderboard = (): TAxiosResponse<{
  status: number
  data: { leaderboard: TLeaderboard }
}> => api.get('common/leaderboard')

export const commonApi = {
  leaderboard,
}
