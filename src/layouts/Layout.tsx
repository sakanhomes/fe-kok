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
        maxHeight="100vh"
        width="100%"
        paddingRight={bodyPR}
      >
        <Header searchInput={searchInput} withSpaces={!withSpaces} />
        <Box
          display="grid"
          flexDirection="column"
          gridAutoRows="min-content"
          overflowY="auto"
          height="100%"
          paddingBottom={40}
        >
          {children}
        </Box>
      </Box>
    </Wrapper>
  )
}
