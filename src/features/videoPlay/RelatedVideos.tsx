import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import { FC, useEffect } from 'react'
import { Title } from './componetns/Title'
import { VideoCard } from './componetns/VideoCard'
import { getRelatedVideosAsync, videoPlaySelector } from './store/videoPlay'

export const RealatedVideos: FC = () => {
  const { select, dispatch } = useRedux()
  const { video, related } = select(videoPlaySelector)

  useEffect(() => {
    if (video) dispatch(getRelatedVideosAsync())
  }, [video])

  return (
    <Box display="grid" gridGap={18} gridTemplateRows="min-content">
      <Title>RELATED VIDEOS</Title>
      {related.videos?.map((item) => (
        <VideoCard key={item.id} {...item} />
      ))}
    </Box>
  )
}
