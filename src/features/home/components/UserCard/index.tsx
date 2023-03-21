import { Avatar } from '@/components/Avatar'
import { Text } from '@/components/Text'
import { Tooltip } from '@/components/Tooltip'
import Box from '@/styles/Box'
import { TShortUserInfo } from '@/types/common'
import { rgba } from 'emotion-rgba'
import { FC } from 'react'
import styled from 'styled-components'

const Wrapper = styled(Box)`
  background-color: ${({ theme }) => rgba(theme.palette.secondary100, 0.5)};
  min-height: 43px;
  border-radius: 5px;
`

export const UserCard: FC<TShortUserInfo & { type?: 'year' | 'month' }> = ({
  name,
  profileImage,
  address,
  type = 'year',
}) => (
  <Wrapper display="flex" alignItems="center" gridGap={12}>
    <Avatar sizes="sm" avatar={profileImage} />
    <Tooltip id={`${address}${type}leaderboard`} content={address} isTooltiped={!name}>
      <Text>{name ?? `${address.substring(0, 8)}...`}</Text>
    </Tooltip>
  </Wrapper>
)
