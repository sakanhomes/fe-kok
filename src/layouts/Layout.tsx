import React, { ReactNode, useState } from 'react'
import { useRedux } from '@/hooks/use-redux'
import { selectors } from '@/containers/errors'
import Box from '@/styles/Box'
import { ErrorPage } from '@/containers/errors/PageError'
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
`

const BodyWrapper = styled.div`
  padding-right: 44px;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 60px;
`

export const Layout: React.FC<{ searchInput: ReactNode }> = ({
  children,
  searchInput,
}) => {
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
      {!errorPage && (
        <BodyWrapper>
          <Header searchInput={searchInput} />
          <Body>{children}</Body>
        </BodyWrapper>
      )}

      <ErrorPage status={errorPage} />
    </Wrapper>
  )
}
