import { Loader } from '@/components/Loader'
import { Text } from '@/components/Text'
import { VideoCard } from '@/components/VideoCard'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { Title } from './components/Title'
import { ECategories } from './enums/categories'
import { getTrendingVideosAsync, homeSelector } from './store/home'

export const TrendingVideos: FC = () => {
  const { select, dispatch } = useRedux()
  const { query } = useRouter()
  const {
    trending: { fetching, videos },
  } = select(homeSelector)
  const { t } = useTranslation('home')

  useEffect(() => {
    const category = query.category as ECategories | undefined
    dispatch(getTrendingVideosAsync(category))
  }, [query])

  return fetching ? (
    <Loader />
  ) : (
    <Box marginTop="37px">
      <Title>{t('trending')}</Title>
      <Box width="100%" display="grid" gridGap={18} gridTemplateColumns="repeat(4, 1fr)">
        {videos?.map((video) => (
          <VideoCard uniqId="for_you" key={video.id} {...video} />
        ))}
        {videos?.length === 0 && (
          <Text variant="p2" color="primary600">
            {t('noTrendingVideos')}
          </Text>
        )}
      </Box>
    </Box>
  )
}
