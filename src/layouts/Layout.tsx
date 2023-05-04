import React, { ReactNode } from 'react'
import Box from '@/components/Box'
import styled from 'styled-components'
import { LEYAOUT_CONTENT } from '@/constants/ids'
import { SideMenu } from './common/SideMenu'
import { Header } from './common/Header'

const Wrapper = styled(Box)`
  transition: 0.3s;
`

export const Layout: React.FC<{
  hasBurger?: boolean
  searchInput: ReactNode
  withSpaces?: boolean
}> = ({ children, searchInput, withSpaces = true, hasBurger }) => {
  const { wrapGap, bodyGap, bodyPR } = {
    wrapGap: withSpaces && !hasBurger ? 35 : undefined,
    bodyPR: withSpaces ? 44 : undefined,
    bodyGap: withSpaces ? 35 : undefined,
  }

  return (
    <Wrapper display="flex" maxHeight="100vh" overflow="hidden" gridGap={wrapGap}>
      <SideMenu hasBurger={hasBurger} />
      <Box overflowY="auto" minHeight="100vh" width="100%">
        <Box
          id={LEYAOUT_CONTENT}
          display="flex"
          flexDirection="column"
          gridGap={bodyGap}
          width="100%"
          maxWidth={1440}
          margin="0 auto"
          position="relative"
          paddingRight={bodyPR}
        >
          <Box position="sticky" top="0" left="0" zIndex="10">
            <Header
              hasBurger={hasBurger}
              searchInput={searchInput}
              withSpaces={!withSpaces}
            />
          </Box>
          <Box
            display="grid"
            flexDirection="column"
            gridAutoRows="min-content"
            paddingBottom={40}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Wrapper>
  )
}
