import { Loader } from '@/components/Loader'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import React, { FC, useEffect } from 'react'
import { creatorCenterSelector, getVideosAsync } from '../../store/creatorCenter'
import { Video } from '../Video'

export const Videos: FC = () => {
  const { dispatch, select } = useRedux()

  const { videos, videosFetching } = select(creatorCenterSelector)

  useEffect(() => {
    dispatch(getVideosAsync())
  }, [])

  if (videosFetching) return <Loader />

  return (
    <Box width="100%" display="grid" gridGap={18} gridTemplateColumns="repeat(4, 1fr)">
      {videos.map((item) => (
        <Video key={item.id} video={item} />
      ))}
    </Box>
  )
}
