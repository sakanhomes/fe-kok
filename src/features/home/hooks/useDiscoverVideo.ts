import { settingsApi } from '@/api/rest/settings'
import { videosApi } from '@/api/rest/videos'
import { useRedux } from '@/hooks/use-redux'
import { TVideo } from '@/types/video'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useEffect, useState } from 'react'

type TStatuses = 'loading' | 'ready' | 'error'

export const useDiscoverVideo = (): { video: TVideo | null; status: TStatuses } => {
  const [video, setVideo] = useState<TVideo | null>(null)
  const [status, setStatus] = useState<TStatuses>('loading')
  const { dispatch } = useRedux()

  const getDiscoverVideo = async () => {
    try {
      const {
        data: {
          data: { settings },
        },
      } = await settingsApi.get()
      if (settings['homepage.main-video-id']) {
        const {
          data: {
            data: { video },
          },
        } = await videosApi.getVideo(settings['homepage.main-video-id'])
        setVideo(video)
        setStatus('ready')
      }
    } catch (e) {
      handleActionErrors({
        e,
        dispatch,
        additionalConditions: () => {
          setStatus('error')
        },
      })
    }
  }

  useEffect(() => {
    getDiscoverVideo()
  }, [])
  return { video, status }
}
