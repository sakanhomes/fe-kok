import { videosApi } from '@/api/rest/videos'
import { useRedux } from '@/hooks/use-redux'
import { TVideo } from '@/types/video'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { ECategories } from 'enums/categories'
import { useEffect, useState } from 'react'

export const useTranding = (
  category?: ECategories
): {
  tranding: TVideo[]
  fetching: boolean
} => {
  const [tranding, setTranding] = useState<TVideo[]>([])
  const [fetching, setFetching] = useState(true)
  const { dispatch } = useRedux()

  const getTranding = async () => {
    try {
      if (!fetching) setFetching(true)
      const {
        data: {
          data: { videos },
        },
      } = await videosApi.getRandom({ amount: 12, category })
      setTranding(videos)
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
    getTranding()
  }, [category])

  return { tranding, fetching }
}
