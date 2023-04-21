import { Loader } from '@/components/loaders/Loader'
import { Text } from '@/components/Text'
import { VideoCard } from '@/components/VideoCard'
import Box from '@/components/Box'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Title } from './components/Title'
import { ECategories } from '../../enums/categories'
import { useRandomVideos } from './hooks/useRandomVideos'

export const RandomVideos: FC = () => {
  const { query } = useRouter()
  const { fetching, randomVideos } = useRandomVideos(query.category as ECategories)
  const { t } = useTranslation('home')

  return fetching ? (
    <Loader />
  ) : (
    <Box marginTop="37px">
      <Title>{t('forYou')}</Title>
      <Box width="100%" display="grid" gridGap={18} gridTemplateColumns="repeat(4, 1fr)">
        {randomVideos.map((video) => (
          <VideoCard shadow={false} uniqId="for_you" key={video.id} {...video} />
        ))}
        {randomVideos.length === 0 && (
          <Text variant="p2" color="primary600">
            {t('noForYouVideos')}
          </Text>
        )}
      </Box>
    </Box>
  )
}
