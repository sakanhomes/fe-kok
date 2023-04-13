import { videosApi } from '@/api/rest/videos'
import { useRedux } from '@/hooks/use-redux'
import { TVideo } from '@/types/video'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { ECategories } from 'enums/categories'
import { useEffect, useState } from 'react'

export const useRandomVideos = (
  category?: ECategories
): {
  randomVideos: TVideo[]
  fetching: boolean
} => {
  const [randomVideos, setRandomVideos] = useState<TVideo[]>([])
  const [fetching, setFetching] = useState(true)
  const { dispatch } = useRedux()

  const getRandomVideos = async () => {
    try {
      if (!fetching) setFetching(true)
      const {
        data: {
          data: { videos },
        },
      } = await videosApi.getRandom({ amount: 12, category })
      setRandomVideos(videos)
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
    getRandomVideos()
  }, [category])

  return { randomVideos, fetching }
}
