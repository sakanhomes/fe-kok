import { Loader } from '@/components/Loader'
import { VideoCard } from '@/components/VideoCard'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { Title } from './components/Title'
import { ECategories } from './enums/categories'
import { getRandomVideosAsync, homeSelector } from './store/home'

export const RandomVideos: FC = () => {
  const { select, dispatch } = useRedux()
  const { query } = useRouter()
  const {
    forYou: { fetching, videos },
  } = select(homeSelector)
  const { t } = useTranslation('home')

  useEffect(() => {
    const category = query.category as ECategories | undefined
    dispatch(getRandomVideosAsync(category))
  }, [query])

  return fetching ? (
    <Loader />
  ) : (
    <Box marginTop="37px">
      <Title>{t('forYou')}</Title>
      <Box width="100%" display="grid" gridGap={18} gridTemplateColumns="repeat(4, 1fr)">
        {videos?.map((video) => (
          <VideoCard uniqId="for_you" key={video.id} {...video} />
        ))}
      </Box>
    </Box>
  )
}
