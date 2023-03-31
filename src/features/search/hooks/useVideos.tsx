import { videosApi } from '@/api/rest/videos'
import { useRedux } from '@/hooks/use-redux'
import { TVideo } from '@/types/video'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useVideos = (): {
  videos: TVideo[]
  fetching: boolean
  getVideos: () => void
} => {
  const [videos, setVideos] = useState<TVideo[]>([])
  const [fetching, setFetching] = useState(true)
  const [mouted, setMounted] = useState(false)
  const { dispatch } = useRedux()
  const { query } = useRouter()

  const getVideosAsync = async (search: string) => {
    setFetching(true)
    try {
      const { data } = await videosApi.get({ search })
      setVideos(data.data.videos)
    } catch (e) {
      handleActionErrors({ e, dispatch })
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    if (!mouted) setMounted(true)
    if (typeof query.value === 'string' && mouted) getVideosAsync(query.value)
  }, [query])

  const getVideos = () => {
    if (typeof query.value === 'string') getVideosAsync(query.value)
  }

  return { videos, fetching, getVideos }
}
