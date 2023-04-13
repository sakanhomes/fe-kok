import Box from '@/components/Box'
import React, { FC } from 'react'
import { useSubscriptions } from '@/features/profile/hooks/useSubscriptions'
import { SearchInput } from './components/SearchInput'
import { CreatorCard } from './containers/CreatorCard'

export const Subscriptions: FC = () => {
  const { subscriptions, setSubscriptions } = useSubscriptions()

  return (
    <Box paddingTop={130}>
      <SearchInput onSubmit={setSubscriptions} />
      <Box marginTop={62} maxWidth={695} display="grid" gridGap={10} marginX="auto">
        {subscriptions.map((item) => (
          <CreatorCard type="subscriptions" user={item} key={item.address} />
        ))}
      </Box>
    </Box>
  )
}
