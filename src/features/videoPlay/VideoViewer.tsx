import { Avatar } from '@/components/Avatar'
import { BaseButton } from '@/components/buttons/BaseButton'
import { FollowingButton } from '@/components/FollowingButton'
import { LikeIcon } from '@/components/icons/LikeIcon'
import { Loader } from '@/components/loaders/Loader'
import { Text } from '@/components/Text'
import { VideoPlayer } from '@/components/VideoPlayer'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/use-auth'
import { useRedux } from '@/hooks/use-redux'
import { useTimeAgo } from '@/hooks/use-time-ago'
import { useIsSubscribed } from '@/hooks/useIsSubscrubed'
import { useStopwatch } from '@/hooks/useStopWatch'
import Box from '@/components/Box'
import { formatViews } from '@/utils/formatViews'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useMemo } from 'react'
import { useUnmount } from 'react-use'
import styled from 'styled-components'
import { Share } from './components/Share'
import { CollectButton } from './containers/CollectButton'
import {
  getVideoAsync,
  getViewedAsync,
  resetVideoPlay,
  setLikeAsync,
  setVideoId,
  videoPlaySelector,
} from './store/videoPlay'

const DotSeparator = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.palette.primary600};
`

const UserBox = styled(Box)`
  border-top: 1px solid ${({ theme }) => theme.palette.secondary200};
`

const UserButton = styled(BaseButton)`
  text-align: left;
`

export const VideoViewer: FC<{ commnets: (id: string) => void }> = ({ commnets }) => {
  const { query, push } = useRouter()
  const { dispatch, select } = useRedux()
  const { id, video, videoFetching, likingFetching } = select(videoPlaySelector)
  const { t } = useTranslation('common')
  const { user, address } = useAuth()
  const { openConnectModal } = useConnectModal()
  const { elapsedTime, startTimer, stopTimer } = useStopwatch()

  useEffect(() => {
    if (id && +elapsedTime >= 5) {
      stopTimer()
      dispatch(getViewedAsync(id))
    }
  }, [elapsedTime])

  const time = useTimeAgo(video?.createdAt)

  useEffect(() => {
    if (typeof query.id === 'string') dispatch(setVideoId(query.id))
  }, [query.id])

  useEffect(() => {
    if (id) dispatch(getVideoAsync(id))
  }, [id, user])

  useUnmount(() => dispatch(resetVideoPlay()))

  const memorizedVideo = useMemo(() => video, [video])

  const isSubscribed = useIsSubscribed(memorizedVideo?.user.address)

  const onLikeClick = () => {
    if (memorizedVideo) {
      if (address && user) dispatch(setLikeAsync(memorizedVideo.id))
      else if (openConnectModal) openConnectModal()
    }
  }

  if (videoFetching) return <Loader />

  return (
    <Box marginBottom={31}>
      {memorizedVideo && (
        <>
          <Box height="538px">
            <VideoPlayer
              onPlay={startTimer}
              onPause={stopTimer}
              url={memorizedVideo.video}
            />
          </Box>
          <Text margin="0 0 6px" variant="h5">
            {memorizedVideo.title}
          </Text>
          <Box display="flex" gridGap="16px" alignItems="center">
            <Text color="primary600" variant="p4" tag="span">
              {formatViews(memorizedVideo.viewsAmount)} {t('views')}
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
            <BaseButton onClick={onLikeClick} disabled={likingFetching}>
              <LikeIcon
                color={memorizedVideo.flags.isLiked ? 'danger100' : 'accent300'}
              />
              {formatViews(memorizedVideo.likesAmount)}
            </BaseButton>
            <CollectButton id={memorizedVideo.id} />
            <Share id={memorizedVideo.id} preview={memorizedVideo.previewImage} />
          </Box>
          <UserBox
            padding="19px 0 39px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <UserButton
              onClick={() =>
                push({
                  pathname: `${ROUTES.CREATOR_PAGE}/${memorizedVideo.user.address}`,
                })
              }
            >
              <Box display="flex" gridGap={12} alignItems="center">
                <Avatar avatar={memorizedVideo.user.profileImage} sizes="lg" />
                <Box>
                  <Text variant="p1" margin="0 0 7px">
                    {memorizedVideo.user.name ?? memorizedVideo.user.address}
                  </Text>
                  <Text variant="p4" color="primary600">
                    {formatViews(memorizedVideo.user.subscribersAmount)} {t('followers')}
                  </Text>
                </Box>
              </Box>
            </UserButton>
            {typeof isSubscribed !== 'undefined' && (
              <FollowingButton
                isSubscribed={isSubscribed}
                $address={memorizedVideo.user.address}
                type="Main"
              />
            )}
          </UserBox>
          {memorizedVideo.description && (
            <Text margin="0 0 50px" variant="l2">
              {memorizedVideo.description}
            </Text>
          )}
          {commnets(memorizedVideo.id)}
        </>
      )}
    </Box>
  )
}
