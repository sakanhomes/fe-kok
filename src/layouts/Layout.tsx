import React, { ReactNode, useState } from 'react'
import Box from '@/styles/Box'
import styled from 'styled-components'
import { SideMenu } from './common/SideMenu'
import { Header } from './common/Header'

const Wrapper = styled(Box)`
  transition: 0.3s;
  max-height: 100vh;
  overflow: hidden;
`

const Body = styled(Box)`
  overflow-y: auto;
  height: 100%;
  padding-bottom: 40px;
  display: grid;
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
    <Wrapper
      display="grid"
      gridTemplateColumns={[openSideMenu ? '225px auto' : '115px auto']}
      gridGap={wrapGap}
    >
      <SideMenu open={openSideMenu} toggleMenu={openMenutoggle} />
      <Box
        display="flex"
        flexDirection="column"
        gridGap={bodyGap}
        maxHeight="100vh"
        paddingRight={bodyPR}
      >
        <Header searchInput={searchInput} withSpaces={!withSpaces} />
        <Body>{children}</Body>
      </Box>
    </Wrapper>
  )
}
