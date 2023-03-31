import { Loader } from '@/components/Loader'
import { Text } from '@/components/Text'
import { VideoCard } from '@/components/VideoCard'
import Box from '@/styles/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect } from 'react'
import { TabLink } from '../components/Title'
import { useVideos } from '../hooks/useVideos'

export const Videos: FC<{
  isHorizontal: boolean
  tab: 'video' | 'creator' | null
  onMoveTo: () => void
}> = ({ isHorizontal, tab, onMoveTo }) => {
  const { videos, fetching, getVideos } = useVideos()
  const { t } = useTranslation('search')

  useEffect(() => {
    getVideos()
  }, [tab])

  if (fetching) return <Loader />

  return (
    <Box>
      <TabLink onClick={onMoveTo} disabled={tab === 'video'}>
        {t('relatedVideos')}
      </TabLink>
      <Box
        marginTop={18}
        display="grid"
        gridGap={20}
        gridTemplateColumns={`repeat(${isHorizontal ? 1 : 4}, 1fr)`}
      >
        {videos.map((item) => (
          <VideoCard
            isHorizontal={isHorizontal}
            horizontalCogfig={{ gridTemplateColumns: '240px auto', fullUsername: true }}
            uniqId={`${item.id}_favorites`}
            {...item}
            key={item.id}
          />
        ))}
      </Box>
      {videos.length === 0 && (
        <Text variant="p2" color="primary500">
          {t('noVideosFound')}
        </Text>
      )}
    </Box>
  )
}
