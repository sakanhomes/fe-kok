import { CircleCheck } from '@/components/icons/CircleCheck'
import { Loader } from '@/components/Loader'
import { Text } from '@/components/Text'
import Box from '@/components/Box'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import styled from 'styled-components'
import { UserCard } from '../homeVideos/components/UserCard'
import { useLeaderboard } from './hooks/useLeaderboard'

const Wrapper = styled(Box)`
  background: ${({ theme }) => theme.uniq.leaderboardBg};
  border-radius: 15px;
  text-align: center;
`

export const Leaderboard: FC = () => {
  const { t } = useTranslation('home')
  const { leaderboard, fetching } = useLeaderboard()

  return (
    <Wrapper maxWidth={384} padding={22}>
      <Text variant="h3" tag="h2" margin="0 0 32px">
        {t('ranking')}
      </Text>
      {fetching && <Loader />}
      {!fetching && leaderboard && (
        <Box display="grid" gridGap={24} gridTemplateColumns="1fr 1fr">
          <Box>
            <Box
              marginBottom={30}
              display="flex"
              gridGap={15}
              alignItems="center"
              justifyContent="center"
            >
              <CircleCheck color="warning" /> <Text variant="p2">{t('year')}</Text>
            </Box>
            <Box display="grid" gridGap="6px">
              {leaderboard.year.map((item) => (
                <UserCard key={item.address} {...item} />
              ))}
            </Box>
          </Box>
          <Box>
            <Box
              marginBottom={30}
              display="flex"
              gridGap={15}
              alignItems="center"
              justifyContent="center"
            >
              <CircleCheck color="accent200" /> <Text variant="p2">{t('month')}</Text>
            </Box>
            <Box display="grid" gridGap="6px">
              {leaderboard.month.map((item) => (
                <UserCard type="month" key={item.address} {...item} />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Wrapper>
  )
}
