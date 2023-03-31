import { Avatar } from '@/components/Avatar'
import { FollowingButton } from '@/components/FollowingButton'
import { Text } from '@/components/Text'
import { ROUTES } from '@/constants/routes'
import { useIsSubscribed } from '@/hooks/useIsSubscrubed'
import Box from '@/styles/Box'
import { TShortUserInfo } from '@/types/common'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import styled from 'styled-components'

const UserName = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 189px;
`

const Description = styled(Text)`
  text-align: center;
`

const StatsItem = styled(Box).attrs((props) => ({
  as: 'li',
  ...props,
}))`
  text-align: center;
  height: 51px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  :not(:last-of-type) {
    border-right: 2px solid ${({ theme }) => theme.palette.primary500};
  }
`

const UserWrapper = styled(Box)`
  cursor: pointer;
`

export const UserCard: FC<{ user: TShortUserInfo }> = ({ user }) => {
  const isSubscribed = useIsSubscribed(user.address)
  const { t } = useTranslation('settings')
  const { push } = useRouter()

  return (
    <Box display="flex" gridGap={24}>
      <UserWrapper
        onClick={() => push({ pathname: `${ROUTES.CREATOR_PAGE}/${user.address}` })}
        display="grid"
        gridGap={24}
        minWidth={189}
        width={189}
      >
        <Avatar sizes="xl" avatar={user.profileImage} />
        <UserName variant="h7">{user.name ?? user.address}</UserName>
      </UserWrapper>
      <Box display="grid" gridGap={20} width="100%">
        <Box display="grid" as="ul" gridTemplateColumns="repeat(3, 1fr)">
          <StatsItem>
            <Text color="primary100" variant="h7">
              {user.videosAmount.toString()}
            </Text>
            <Text variant="l2" color="primary500">
              {t('settings:videos')}
            </Text>
          </StatsItem>
          <StatsItem>
            <Text color="primary100" variant="h7">
              {user.subscribersAmount.toString()}
            </Text>
            <Text variant="l2" color="primary500">
              {t('settings:followers')}
            </Text>
          </StatsItem>
          <StatsItem>
            <Text color="primary100" variant="h7">
              {user.subscriptionsAmount.toString()}
            </Text>
            <Text variant="l2" color="primary500">
              {t('settings:following')}
            </Text>
          </StatsItem>
        </Box>
        <Description variant="l2" color="primary500">
          {user.description}
        </Description>
        <Box width="fit-content" marginX="auto">
          <FollowingButton $address={user.address} isSubscribed={!!isSubscribed} />
        </Box>
      </Box>
    </Box>
  )
}
