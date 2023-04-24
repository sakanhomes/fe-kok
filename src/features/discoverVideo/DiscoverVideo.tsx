import { Avatar } from '@/components/Avatar'
import { BaseButton } from '@/components/buttons/BaseButton'
import { Loader } from '@/components/loaders/Loader'
import { Text } from '@/components/Text'
import { Tooltip } from '@/components/Tooltip'
import { VideoPlayer } from '@/components/VideoPlayer'
import { ROUTES } from '@/constants/routes'
import { useTimeAgo } from '@/hooks/use-time-ago'
import Box from '@/components/Box'
import { formatViews } from '@/utils/formatViews'
import { rgba } from 'emotion-rgba'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import LinesEllipsis from 'react-lines-ellipsis'
import styled from 'styled-components'
import { useDiscoverVideo } from './hooks/useDiscoverVideo'

const PlayerWrapper = styled(Box)`
  border-radius: 20px;
  cursor: pointer;
  text-align: left;
  position: relative;
  background-color: ${({ theme }) => theme.palette.primary200};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const UserButton = styled(BaseButton)`
  text-align: left;
  padding-top: 30px;
  padding-bottom: 30px;
  width: 100%;
  display: flex;
  gap: 12px;
`

const ContentWrapper = styled(Box)`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  padding: 42px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => rgba(theme.palette.primary100, 0.9)} 20%,
    ${({ theme }) => rgba(theme.palette.primary100, 0)} 50%
  );
`

const StyledVideoplayer = styled(VideoPlayer)`
  border-radius: 20px !important;
  filter: drop-shadow(6px 6px 10px ${({ theme }) => rgba(theme.palette.accent100, 0.3)});
`

const UserName = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`

const DotSeparator = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.palette.secondary100};
`

const Title = styled(LinesEllipsis)`
  height: 100%;
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  color: ${({ theme }) => theme.palette.secondary100};
`

export const DiscoverVideo: FC = () => {
  const { video, status } = useDiscoverVideo()
  const { t } = useTranslation('common')

  const time = useTimeAgo(video?.createdAt)

  const { push } = useRouter()
  const onVideoClick = () => push({ pathname: `${ROUTES.VIDEO}/${video?.id}` })
  const onUserClick = () =>
    push({ pathname: `${ROUTES.CREATOR_PAGE}/${video?.user.address}` })

  return (
    <Box display="flex" flexDirection="column" gridGap={23}>
      <Text variant="h3">{t('home:discover')}</Text>
      <PlayerWrapper onClick={() => video && onVideoClick()}>
        {status === 'loading' && <Loader color="secondary100" />}
        {status === 'ready' && video && (
          <>
            <StyledVideoplayer url={video?.video} height="100%" preview secconds={15} />
            <ContentWrapper>
              <Box width="50%">
                <Title maxLine={5} text={video.title} basedOn="words" />
                <UserButton
                  onClick={(e) => {
                    e.stopPropagation()
                    onUserClick()
                  }}
                >
                  <Avatar sizes="md2" avatar={video.user.profileImage} />
                  <Box>
                    <Tooltip
                      content={video.user.name ?? video.user.address}
                      id={`${video.user.address}_discover-user`}
                    >
                      <UserName
                        color="secondary100"
                        variant="l2"
                        tag="h3"
                        margin="0 0 10px"
                      >
                        {video.user.name ?? video.user.address}
                      </UserName>
                    </Tooltip>
                    <Box display="flex" gridGap="10px" alignItems="center">
                      <Text color="secondary100" variant="p4" tag="span">
                        {formatViews(video.viewsAmount)} {t('views')}
                      </Text>
                      <DotSeparator />
                      {time && (
                        <Text color="secondary100" variant="p4" tag="span">
                          {time}
                        </Text>
                      )}
                    </Box>
                  </Box>
                </UserButton>
              </Box>
            </ContentWrapper>
          </>
        )}
        {status === 'error'}
      </PlayerWrapper>
    </Box>
  )
}