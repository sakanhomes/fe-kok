import Box from '@/styles/Box'
import React, { FC } from 'react'
import { SearchInput } from './components/SearchInput'
import { CreatorCard } from './containers/CreatorCard'
import { useSubscriptions } from './hooks/useSubscriptions'

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
