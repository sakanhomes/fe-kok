import React, { useState } from 'react'
import { useRedux } from '@/hooks/use-redux'
import { selectors } from '@/containers/errors'
import Box from '@/styles/Box'
import { ErrorPage } from '@/containers/errors/PageError'
import styled from 'styled-components'
import { SideMenu } from './common/SideMenu'

const Wrapper = styled(Box)`
  transition: 0.3s;
`

const Body = styled(Box)`
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
`

export const Layout: React.FC = ({ children }) => {
  const { select } = useRedux()
  const { errorPage } = select(selectors.errors)
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const openMenutoggle = () => setOpenSideMenu(!openSideMenu)

  return (
    <Wrapper
      display="grid"
      gridTemplateColumns={[openSideMenu ? '215px auto' : '115px auto']}
      gridGap={[35]}
    >
      <SideMenu open={openSideMenu} toggleMenu={openMenutoggle} />
      {!errorPage && <Body display="flex">{children}</Body>}

      <ErrorPage status={errorPage} />
    </Wrapper>
  )
}
