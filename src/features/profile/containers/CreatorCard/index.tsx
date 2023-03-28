import { Avatar } from '@/components/Avatar'
import { FollowingButton } from '@/components/FollowingButton'
import { Text } from '@/components/Text'
import Box from '@/styles/Box'
import { TShortUserInfo } from '@/types/common'
import { rgba } from 'emotion-rgba'
import React, { FC } from 'react'
import styled from 'styled-components'

const Wrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.secondary100};
  border: 1px solid ${({ theme }) => rgba(theme.palette.primary100, 0.26)};
  border-radius: 8px;
`

export const CreatorCard: FC<{
  user: TShortUserInfo
  type: 'subscribers' | 'subscriptions'
}> = ({ user, type }) => (
  <Wrapper
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    paddingX={12}
    width="100%"
    height={60}
  >
    <Box width="fit-content" display="flex" gridGap="7px" alignItems="center">
      <Avatar avatar={user.profileImage} />
      <Text>{user.name ?? user.address}</Text>
    </Box>
    {type === 'subscriptions' && (
      <FollowingButton isSubscribed type="Secondary" $address={user.address} />
    )}
  </Wrapper>
)
