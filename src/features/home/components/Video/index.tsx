import { Avatar } from '@/components/Avatar'
import { Text } from '@/components/Text'
import { Tooltip } from '@/components/Tooltip'
import { ROUTES } from '@/constants/routes'
import { useTimeAgo } from '@/hooks/use-time-ago'
import Box from '@/styles/Box'
import { TVideo } from '@/types/video'
import { formatViews } from '@/utils/formatViews'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import * as S from './styled'

export const Video: FC<{ video: TVideo }> = ({ video }) => {
  const { id, title, previewImage, duration, viewsAmount, createdAt, user } = video
  const { push } = useRouter()
  const onVideoClick = () => push({ pathname: `${ROUTES.VIDEO}/${id}` })
  const onUserClick = () => push({ pathname: `${ROUTES.CREATOR_PAGE}/${user.address}` })

  const time = useTimeAgo(createdAt)
  const { t } = useTranslation('common')

  return (
    <Box maxWidth="100%">
      <S.ImageButton image={previewImage} onClick={onVideoClick}>
        <S.Duration color="secondary100">{duration}</S.Duration>
      </S.ImageButton>
      <S.TitleButton onClick={onVideoClick}>
        <S.Title maxLine={2} component="h3" text={title} basedOn="words" />
      </S.TitleButton>
      <Box marginBottom="4px" display="flex" gridGap={29} alignItems="center">
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
      <S.User
        height={35}
        display="flex"
        gridGap="10px"
        alignItems="center"
        onClick={onUserClick}
      >
        <Avatar avatar={user.profileImage} sizes="xs" />
        <Tooltip
          isTooltiped={!user.name}
          id={`${user.address}_${createdAt}`}
          content={user.address}
        >
          <Text>{user.name ?? `${user.address.substring(0, 8)}...`}</Text>
        </Tooltip>
      </S.User>
    </Box>
  )
}
