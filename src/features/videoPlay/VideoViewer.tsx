import { Avatar } from '@/components/Avatar'
import { BaseButton } from '@/components/buttons/BaseButton'
import { CollectIcon } from '@/components/icons/CollectIcon'
import { LikeIcon } from '@/components/icons/LikeIcon'
import { ShareIcon } from '@/components/icons/ShareIcon'
import { Loader } from '@/components/Loader'
import { Text } from '@/components/Text'
import { VideoPlayer } from '@/components/VideoPlayer'
import { useRedux } from '@/hooks/use-redux'
import { useTimeAgo } from '@/hooks/use-time-ago'
import Box from '@/styles/Box'
import { formatViews } from '@/utils/formatViews'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useUnmount } from 'react-use'
import styled from 'styled-components'
import {
  getVideoAsync,
  resetVideoPlay,
  setVideoId,
  videoPlaySelector,
} from './store/videoPlay'

const DotSeparator = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.palette.primary600};
`

const FollowButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.palette.accent300};
  color: ${({ theme }) => theme.palette.accent300};
  border-radius: 8px;
  min-width: 162px;
  height: 41px;
  justify-content: center;
`

const UserBox = styled(Box)`
  border-top: 1px solid ${({ theme }) => theme.palette.secondary200};
`

export const VideoViewer: FC = () => {
  const { query } = useRouter()
  const { dispatch, select } = useRedux()
  const { id, video, videoFetching } = select(videoPlaySelector)
  const { t } = useTranslation('common')

  const time = useTimeAgo(video?.createdAt)

  useEffect(() => {
    if (typeof query.id === 'string') dispatch(setVideoId(query.id))
  }, [query.id])

  useEffect(() => {
    if (id) dispatch(getVideoAsync(id))
  }, [id])

  useUnmount(() => dispatch(resetVideoPlay()))

  if (videoFetching) return <Loader />

  return (
    <Box marginBottom={31}>
      {video && (
        <>
          <Box height="538px">{video && <VideoPlayer url={video.video} />}</Box>
          <Text margin="0 0 6px" variant="h5">
            {video.title}
          </Text>
          <Box display="flex" gridGap="16px" alignItems="center">
            <Text color="primary600" variant="p4" tag="span">
              {formatViews(video.viewsAmount)} {t('views')}
            </Text>
            <DotSeparator />
            {time && (
              <Text color="primary600" variant="p4" tag="span">
                {time}
              </Text>
            )}
          </Box>
          <Box
            display="flex"
            gridGap={40}
            marginTop={17}
            marginBottom={28}
            alignItems="center"
          >
            <BaseButton>
              <LikeIcon color="accent300" /> {formatViews(video.likesAmount)}
            </BaseButton>
            <BaseButton>
              <CollectIcon color="accent300" />
            </BaseButton>
            <BaseButton>
              <ShareIcon variant={2} color="accent300" />
            </BaseButton>
          </Box>
          <UserBox
            padding="19px 0 39px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" gridGap={12} alignItems="center">
              <Avatar avatar={video.user.profileImage} sizes="lg" />
              <Box>
                <Text variant="p1" margin="0 0 7px">
                  {video.user.name ?? video.user.address}
                </Text>
                <Text variant="p4" color="primary600">
                  {formatViews(video.user.followersAmount)} followers
                </Text>
              </Box>
            </Box>
            <FollowButton>+ FOLLOW</FollowButton>
          </UserBox>
          {video.description && <Text variant="l2">{video.description}</Text>}
        </>
      )}
    </Box>
  )
}
