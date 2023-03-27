import { Avatar } from '@/components/Avatar'
import { Text } from '@/components/Text'
import { Tooltip } from '@/components/Tooltip'
import { useAuth } from '@/hooks/use-auth'
import Box from '@/styles/Box'
import { rgba } from 'emotion-rgba'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import styled from 'styled-components'

const StatsItem = styled(Box).attrs((props) => ({
  as: 'li',
  ...props,
}))`
  text-align: center;
  width: 113px;
  height: 50px;
  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  :not(:last-of-type) {
    border-right: 1px solid ${({ theme }) => theme.palette.primary500};
  }
`

const StyledAvatar = styled(Avatar)`
  filter: drop-shadow(0px 4px 4px ${({ theme }) => rgba(theme.palette.primary100, 0.25)});
`

const UserName = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`

export const User: FC = () => {
  const { user } = useAuth()
  const { t } = useTranslation('settings')

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gridGap={32}>
      {user && (
        <>
          <StyledAvatar sizes="xl" avatar={user?.profileImage} />
          <Tooltip id={`${user.address}user`} content={user.address}>
            <UserName variant="h5" tag="h2" color="primary100">
              {user.name ?? user.address}
            </UserName>
          </Tooltip>
          <Box display="flex" as="ul" alignItems="center">
            <StatsItem>
              <Text color="primary100" variant="p1">
                {user.videosAmount.toString()}
              </Text>
              <Text color="primary500" variant="p2">
                {t('videos')}
              </Text>
            </StatsItem>
            <StatsItem>
              <Text color="primary100" variant="p1">
                {user.subscribersAmount.toString()}
              </Text>
              <Text color="primary500" variant="p2">
                {t('followers')}
              </Text>
            </StatsItem>
            <StatsItem>
              <Text color="primary100" variant="p1">
                {user.subscriptionsAmount.toString()}
              </Text>
              <Text color="primary500" variant="p2">
                {t('following')}
              </Text>
            </StatsItem>
          </Box>
          <Box maxWidth={318}>
            <Text color="primary500">{user.description ?? 'About me...'}</Text>
          </Box>
        </>
      )}
    </Box>
  )
}
