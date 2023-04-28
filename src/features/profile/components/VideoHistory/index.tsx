import { Avatar } from '@/components/Avatar'
import { Text } from '@/components/Text'
import { ROUTES } from '@/constants/routes'
import Box from '@/components/Box'
import { TVideo } from '@/types/video'
import { formatViews } from '@/utils/formatViews'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import * as S from './styled'

export const VideoHistory: FC<TVideo> = ({
  id,
  title,
  previewImage,
  viewsAmount,
  duration,
  user,
}) => {
  const { push } = useRouter()

  const onVideoClick = () => push({ pathname: `${ROUTES.VIDEO}/${id}` })
  const onUserClick = () => push({ pathname: `${ROUTES.CREATOR_PAGE}/${user?.address}` })

  const { t } = useTranslation('common')

  return (
    <Box maxWidth="100%" display="flex" gridGap={16}>
      <Box position="relative">
        <S.Duration
          position="absolute"
          padding=" 2px 5px"
          bottom="5px"
          right="10px"
          zIndex="1"
        >
          <Text color="secondary100" variant="l2">
            {duration}
          </Text>
        </S.Duration>
        <S.ImageButton image={previewImage} onClick={onVideoClick} />
      </Box>
      <Box>
        <S.TitleButton onClick={onVideoClick}>
          <S.Title maxLine={2} component="h3" text={title} basedOn="words" />
        </S.TitleButton>
        <Box marginBottom="10px">
          <Text color="primary600" variant="p4" tag="span">
            {formatViews(viewsAmount)} {t(viewsAmount === 1 ? 'view' : 'views')}
          </Text>
        </Box>
        <S.User
          height={35}
          display="flex"
          gridGap="12px"
          alignItems="center"
          onClick={onUserClick}
        >
          <Avatar avatar={user.profileImage} sizes="xs" />
          <Text variant="p4">{user.name ?? user.address}</Text>
        </S.User>
      </Box>
    </Box>
  )
}
