import { commonApi } from '@/api/rest/common'
import { useRedux } from '@/hooks/use-redux'
import { TLeaderboard } from '@/types/common'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useEffect, useState } from 'react'

export const useLeaderboard = (): {
  leaderboard: TLeaderboard | null
  fetching: boolean
} => {
  const [leaderboard, setLeaderboard] = useState<TLeaderboard | null>(null)
  const [fetching, setFetching] = useState(true)
  const { dispatch } = useRedux()

  const getLeaderboard = async () => {
    try {
      if (!fetching) setFetching(true)
      const {
        data: {
          data: { leaderboard },
        },
      } = await commonApi.leaderboard()
      setLeaderboard(leaderboard)
    } catch (e) {
      handleActionErrors({
        e,
        dispatch,
      })
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    getLeaderboard()
  }, [])

  return { leaderboard, fetching }
}
