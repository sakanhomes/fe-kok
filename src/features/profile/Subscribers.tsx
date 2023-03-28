import Box from '@/styles/Box'
import React, { FC } from 'react'
import { SearchInput } from './components/SearchInput'
import { CreatorCard } from './containers/CreatorCard'
import { useSubscribers } from './hooks/useSubscribers'

export const Subscribers: FC = () => {
  const { subscribers, setSubscribers } = useSubscribers()

  return (
    <Box paddingTop={130}>
      <SearchInput onSubmit={setSubscribers} />
      <Box marginTop={62} maxWidth={695} display="grid" gridGap={10} marginX="auto">
        {subscribers.map((item) => (
          <CreatorCard type="subscribers" user={item} key={item.address} />
        ))}
      </Box>
    </Box>
  )
}
