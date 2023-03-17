import React, { ReactNode, useState } from 'react'
import Box from '@/styles/Box'
import styled from 'styled-components'
import { SideMenu } from './common/SideMenu'
import { Header } from './common/Header'

const Wrapper = styled(Box)`
  transition: 0.3s;
`

export const Layout: React.FC<{ searchInput: ReactNode; withSpaces?: boolean }> = ({
  children,
  searchInput,
  withSpaces = true,
}) => {
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const openMenutoggle = () => setOpenSideMenu(!openSideMenu)

  const { wrapGap, bodyGap, bodyPR } = {
    wrapGap: withSpaces ? 35 : undefined,
    bodyPR: withSpaces ? 44 : undefined,
    bodyGap: withSpaces ? 35 : undefined,
  }

  return (
    <Wrapper display="flex" maxHeight="100vh" overflow="hidden" gridGap={wrapGap}>
      <SideMenu open={openSideMenu} toggleMenu={openMenutoggle} />
      <Box
        display="flex"
        flexDirection="column"
        gridGap={bodyGap}
        width="100%"
        maxWidth={1440}
        margin="0 auto"
        overflowY="auto"
        position="relative"
        paddingRight={bodyPR}
      >
        <Box position="sticky" top="0" left="0" zIndex="10">
          <Header searchInput={searchInput} withSpaces={!withSpaces} />
        </Box>
        <Box
          display="grid"
          flexDirection="column"
          gridAutoRows="min-content"
          height="100%"
          paddingBottom={40}
        >
          {children}
        </Box>
      </Box>
    </Wrapper>
  )
}
