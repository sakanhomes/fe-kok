import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import { FC, useEffect } from 'react'
import { VideoCard } from '@/components/VideoCard'
import { Title } from './componetns/Title'
import { getRelatedVideosAsync, videoPlaySelector } from './store/videoPlay'

export const RealatedVideos: FC = () => {
  const { select, dispatch } = useRedux()
  const { video, related } = select(videoPlaySelector)

  useEffect(() => {
    if (video) dispatch(getRelatedVideosAsync())
  }, [video?.category])

  return (
    <Box display="grid" gridGap={18} gridTemplateRows="min-content">
      <Title>RELATED VIDEOS</Title>
      {related.videos?.map((item) => (
        <VideoCard
          isHorizontal
          uniqId="related"
          showedTitleRows={3}
          key={item.id}
          {...item}
        />
      ))}
    </Box>
  )
}
