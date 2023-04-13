import { Text } from '@/components/Text'
import Box from '@/components/Box'
import React, { FC } from 'react'

export const StaticLinks: FC = () => (
  <Box
    display="grid"
    gridColumnGap="4px"
    gridRowGap={12}
    gridTemplateColumns="repeat(2, 1fr)"
  >
    <Text variant="l2">Contact us</Text>
    <Text variant="l2">Telegram</Text>
    <Text variant="l2">KOK official</Text>
    <Text variant="l2">Twitter</Text>
    <Text variant="l2">Whitepaper</Text>
    <Text variant="l2">Github</Text>
    <Text variant="l2">Buy KOK</Text>
    <Text variant="l2">Events</Text>
    <Text variant="l2">About us</Text>
    <Text variant="l2">Career</Text>
  </Box>
)
