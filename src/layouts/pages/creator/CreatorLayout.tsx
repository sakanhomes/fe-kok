import Box from '@/styles/Box'
import React, { FC, ReactNode } from 'react'

type TProfileLayout = {
  header: ReactNode
}

export const CreatorLayout: FC<TProfileLayout> = ({ header, children }) => (
  <Box>
    <Box overflow="hidden" height={214}>
      {header}
    </Box>
    <Box>{children}</Box>
  </Box>
)
