import { Avatar } from '@/components/Avatar'
import { BaseButton } from '@/components/buttons/BaseButton'
import { Text } from '@/components/Text'
import { Tooltip } from '@/components/Tooltip'
import { ROUTES } from '@/constants/routes'
import { useTimeAgo } from '@/hooks/use-time-ago'
import Box from '@/styles/Box'
import { TNotification } from '@/types/notification'
import { useRouter } from 'next/router'
import { FC } from 'react'
import styled from 'styled-components'

const NewNoficationMarker = styled(Box)`
  background-color: ${({ theme }) => theme.palette.danger200};
  border-radius: 50%;
`

const UserName = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`

const Image = styled.img`
  width: 90px;
  height: 60px;
  object-fit: cover;
  object-position: center center;
  border-radius: 5px;
`

const Wrapper = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary100};
`

export const Notification: FC<TNotification> = ({
  message,
  params,
  createdAt,
  readAt,
  id,
}) => {
  const time = useTimeAgo(createdAt)
  const { push } = useRouter()
  return (
    <Wrapper paddingY="20px" display="flex" justifyContent="space-between" gridGap={28}>
      <Box>
        <Box
          display="flex"
          alignItems="center"
          gridGap="10px"
          position="relative"
          marginBottom={19}
        >
          {!readAt && (
            <NewNoficationMarker position="absolute" left="0" width="5px" height="5px" />
          )}
          <BaseButton
            onClick={() =>
              push({ pathname: `${ROUTES.CREATOR_PAGE}/${params.user.address}` })
            }
          >
            <Box display="flex" alignItems="center" gridGap="10px">
              <Box marginLeft="10px">
                <Avatar
                  customSize={20}
                  bordered={false}
                  avatar={params.user.profileImage}
                />
              </Box>
              <Tooltip id={`${id}notification_user_name`} content={params.user.address}>
                <UserName variant="p2">{params.user.address}</UserName>
              </Tooltip>
            </Box>
          </BaseButton>
          <Text variant="l2" color="primary600">
            {time}
          </Text>
        </Box>
        <Text margin="0 0 0 40px" variant="p2">
          {message}
        </Text>
      </Box>
      {params.video && (
        <BaseButton
          onClick={() => push({ pathname: `${ROUTES.VIDEO}/${params.video?.id}` })}
        >
          <Image src={params.video.previewImage} />
        </BaseButton>
      )}
    </Wrapper>
  )
}
