import { Loader } from '@/components/Loader'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { Video } from './components/Video'
import { ECategories } from './enums/categories'
import { getRandomVideosAsync, homeSelector } from './store/home'

export const RandomVideos: FC = () => {
  const { select, dispatch } = useRedux()
  const { query } = useRouter()
  const {
    forYou: { fetching, videos },
  } = select(homeSelector)

  useEffect(() => {
    const category = query.category as ECategories | undefined
    dispatch(getRandomVideosAsync(category))
  }, [query])

  return fetching ? (
    <Loader />
  ) : (
    <Box
      marginTop="37px"
      width="100%"
      display="grid"
      gridGap={18}
      gridTemplateColumns="repeat(4, 1fr)"
    >
      {videos?.map((video) => (
        <Video key={video.id} video={video} />
      ))}
    </Box>
  )
}
