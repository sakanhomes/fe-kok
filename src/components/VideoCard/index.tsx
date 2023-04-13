import { Avatar } from '@/components/Avatar'
import { Text } from '@/components/Text'
import { Tooltip } from '@/components/Tooltip'
import { ROUTES } from '@/constants/routes'
import { useTimeAgo } from '@/hooks/use-time-ago'
import Box from '@/components/Box'
import { TShortUserInfo } from '@/types/common'
import { TOwnerVideo } from '@/types/video'
import { formatViews } from '@/utils/formatViews'
import { rgba } from 'emotion-rgba'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { FC, ReactNode, useState } from 'react'
import styled from 'styled-components'
import * as S from './styled'

const Duration = styled(Box)`
  background-color: ${({ theme }) => rgba(theme.palette.primary100, 0.75)};
  border-radius: 4px;
`

const UserName = styled(Text)<{ fullWidth: boolean }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '140px')};
`

export type TVideoCard = {
  isHorizontal?: boolean
  showedTitleRows?: number
  uniqId: string
  additionalContent?: ReactNode
  showUser?: boolean
  user?: TShortUserInfo
  horizontalCogfig?: {
    gridTemplateColumns?: string
    fullUsername?: boolean
  }
  height?: number
} & TOwnerVideo

export const VideoCard: FC<TVideoCard> = ({
  id,
  title,
  previewImage,
  viewsAmount,
  duration,
  createdAt,
  user,
  isHorizontal,
  horizontalCogfig,
  height,
  showedTitleRows = 2,
  uniqId,
  additionalContent,
  showUser = true,
}) => {
  const { push } = useRouter()

  const onVideoClick = () => push({ pathname: `${ROUTES.VIDEO}/${id}` })
  const onUserClick = () => push({ pathname: `${ROUTES.CREATOR_PAGE}/${user?.address}` })

  const [showFullTitle, setShowFullTitle] = useState(false)

  const time = useTimeAgo(createdAt)
  const { t } = useTranslation('common')

  const horizontalProps = isHorizontal
    ? {
        display: 'grid',
        gridTemplateColumns: horizontalCogfig?.gridTemplateColumns ?? 'repeat(2, 1fr)',
        gridGap: 24,
      }
    : {}

  return (
    <Box maxWidth="100%" {...horizontalProps}>
      <Box position="relative">
        <Duration
          position="absolute"
          padding=" 2px 5px"
          bottom="5px"
          right="10px"
          zIndex="1"
        >
          <Text color="secondary100" variant="l2">
            {duration}
          </Text>
        </Duration>
        <S.ImageButton
          height={height}
          isHorizontal={isHorizontal}
          image={previewImage}
          onClick={onVideoClick}
        />
      </Box>
      <Box>
        <S.TitleButton onClick={onVideoClick}>
          <Tooltip isTooltiped={showFullTitle} content={title} id={`${id}${uniqId}`}>
            <S.Title
              maxLine={showedTitleRows}
              component="h3"
              text={title}
              basedOn="words"
              onReflow={({ clamped }) => setShowFullTitle(clamped)}
            />
          </Tooltip>
        </S.TitleButton>
        <Box
          marginBottom="4px"
          display="flex"
          gridGap={isHorizontal ? 10 : 29}
          alignItems="center"
        >
          <Text color="primary600" variant="p4" tag="span">
            {formatViews(viewsAmount)} {t('views')}
          </Text>
          <S.DotSeparator />
          {time && (
            <Text color="primary600" variant="p4" tag="span">
              {time}
            </Text>
          )}
        </Box>
        {showUser && user && (
          <S.User
            height={35}
            display="flex"
            gridGap="10px"
            alignItems="center"
            onClick={onUserClick}
          >
            <Avatar avatar={user.profileImage} sizes="xs" />
            <Tooltip
              content={user.name ?? user.address}
              id={`${user.address}_${createdAt}`}
            >
              <UserName fullWidth={!!horizontalCogfig?.fullUsername && !!isHorizontal}>
                {user.name ?? user.address}
              </UserName>
            </Tooltip>
          </S.User>
        )}
        {additionalContent}
      </Box>
    </Box>
  )
}
