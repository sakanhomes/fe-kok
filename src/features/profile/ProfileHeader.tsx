import Box from '@/styles/Box'
import React, { FC } from 'react'
import baseProfile from '@/assets/base-profile-bg.jpg'
import styled from 'styled-components'
import { useAuth } from '@/hooks/use-auth'
import { Avatar } from '@/components/Avatar'
import { Text } from '@/components/Text'
import LinesEllipsis from 'react-lines-ellipsis'
import { Tooltip } from '@/components/Tooltip'
import useTranslation from 'next-translate/useTranslation'

const Wrapper = styled(Box)<{ image?: string }>`
  background: url(${({ image }) => image ?? baseProfile.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100%;
`

const StatsItem = styled(Box).attrs((props) => ({
  as: 'li',
  ...props,
}))`
  text-align: center;
  width: 131px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  :not(:last-of-type) {
    border-right: 1px solid ${({ theme }) => theme.palette.secondary100};
  }
`

const Description = styled(LinesEllipsis)`
  height: 100%;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  color: ${({ theme }) => theme.palette.secondary100};
`

export const ProfileHeader: FC = () => {
  const { user } = useAuth()
  const { t } = useTranslation('settings')

  return (
    <Wrapper
      image={user?.backgroundImage}
      height="100%"
      padding="30px 64px 15px 120px"
      position="relative"
      display="flex"
      justifyContent="space-between"
    >
      {user && (
        <>
          <Box display="flex" gridGap={36}>
            <Box minWidth={160}>
              <Avatar avatar={user.profileImage} sizes="2xl" />
            </Box>
            <Box maxWidth={505} display="flex" flexDirection="column">
              <Tooltip
                isTooltiped={!user.name}
                id={`${user.address}header`}
                content={user.address}
              >
                <Text variant="h1" tag="h2" margin="0 0 30px" color="secondary100">
                  {user.name ?? `${user.address.substring(0, 8)}...`}
                </Text>
              </Tooltip>
              {user.description && (
                <Tooltip
                  isTooltiped={!!user.description}
                  id="description_tooltip"
                  content={user.description}
                >
                  <Description
                    maxLine={4}
                    text={user.description ?? 'About me...'}
                    basedOn="words"
                  />
                </Tooltip>
              )}
            </Box>
          </Box>
          <Box display="flex" as="ul" alignItems="center">
            <StatsItem>
              <Text color="secondary100" variant="h4">
                {user.videosAmount.toString()}
              </Text>
              <Text color="secondary100" variant="p2">
                {t('videos')}
              </Text>
            </StatsItem>
            <StatsItem>
              <Text color="secondary100" variant="h4">
                {user.subscribersAmount.toString()}
              </Text>
              <Text color="secondary100" variant="p2">
                {t('followers')}
              </Text>
            </StatsItem>
            <StatsItem>
              <Text color="secondary100" variant="h4">
                {user.subscriptionsAmount.toString()}
              </Text>
              <Text color="secondary100" variant="p2">
                {t('following')}
              </Text>
            </StatsItem>
          </Box>
        </>
      )}
    </Wrapper>
  )
}
