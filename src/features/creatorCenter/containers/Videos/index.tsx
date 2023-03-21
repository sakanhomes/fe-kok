import { BaseButton } from '@/components/buttons/BaseButton'
import { DeleteIcon } from '@/components/icons/DeleteIcon'
import { EyeIcon } from '@/components/icons/EyeIcon'
import { Loader } from '@/components/Loader'
import { VideoCard } from '@/components/VideoCard'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect } from 'react'
import { creatorCenterSelector, getVideosAsync } from '../../store/creatorCenter'

export const Videos: FC = () => {
  const { dispatch, select } = useRedux()
  const { t } = useTranslation('creator-center')

  const { videos, videosFetching } = select(creatorCenterSelector)

  useEffect(() => {
    dispatch(getVideosAsync())
  }, [])

  if (videosFetching) return <Loader />

  return (
    <Box width="100%" display="grid" gridGap={18} gridTemplateColumns="repeat(4, 1fr)">
      {videos.map((item) => (
        <VideoCard
          uniqId="owner_video"
          key={item.id}
          {...item}
          additionalContent={
            <Box
              marginTop={10}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <BaseButton
                icon={{
                  el: <EyeIcon isOpen={item.isPublic} color="primary500" />,
                  place: 'prepend',
                }}
              >
                {item.isPublic ? t('public') : t('private')}
              </BaseButton>
              <BaseButton>
                <DeleteIcon color="primary100" />
              </BaseButton>
            </Box>
          }
        />
      ))}
    </Box>
  )
}
