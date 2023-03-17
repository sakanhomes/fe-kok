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

const Image = styled(Avatar)`
  min-width: 40px;
`

export const UserCard: FC<TShortUserInfo & { type?: 'year' | 'month' }> = ({
  name,
  profileImage,
  address,
  type = 'year',
}) => (
  <Wrapper display="flex" alignItems="center" gridGap={12}>
    <Image sizes="sm" avatar={profileImage} />
    <Text data-for={`${address}${type}leaderboard`} data-tip>
      {name ?? `${address.substring(0, 8)}...`}
    </Text>
    {!name && (
      <Tooltip
        delayShow={200}
        id={`${address}${type}leaderboard`}
        clickable
        place="bottom"
        type="light"
        effect="float"
      >
        {address}
      </Tooltip>
    )}
  </Wrapper>
)
