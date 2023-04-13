import { VideoCard } from '@/components/VideoCard'
import Box from '@/components/Box'
import React, { FC } from 'react'
import { useVideos } from '../hooks/useVideos'

export const Videos: FC = () => {
  const { videos } = useVideos()

  return (
    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gridGap={20}>
      {videos.map((item) => (
        <VideoCard uniqId={`${item.id}creator_videos`} key={item.id} {...item} />
      ))}
    </Box>
  )
}
