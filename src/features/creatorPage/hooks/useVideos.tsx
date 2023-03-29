import { usersApi } from '@/api/rest/users'
import { useRedux } from '@/hooks/use-redux'
import { TVideo } from '@/types/video'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useVideos = (): {
  videos: TVideo<never>[]
  setVideos: (address: string) => void
} => {
  const [videos, setVideos] = useState<TVideo<never>[]>([])
  const { dispatch } = useRedux()
  const { query } = useRouter()

  const getVideosAsync = async (address: string) => {
    try {
      const { data } = await usersApi.getUserVideos(address)
      setVideos(data.data.videos)
    } catch (e) {
      handleActionErrors({ e, dispatch })
    }
  }

  const setVideosSync = (address: string) => {
    getVideosAsync(address)
  }

  useEffect(() => {
    if (typeof query.id === 'string') setVideosSync(query.id)
  }, [query])

  return { videos, setVideos: setVideosSync }
}
