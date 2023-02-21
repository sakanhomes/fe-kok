import React from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { useRedux } from '@/hooks/use-redux'
import { selectors, ErrorPage } from '@/containers/errors'
import { Drawer } from './common/Drawer'
import { Header } from './common/Header'

type TProps = {
  header?: boolean
  drawer?: boolean
  toolbar?: boolean
}

export const Layout: React.FC<TProps> = ({
  children,
  header = true,
  drawer = true,
  toolbar = true,
}) => {
  const { select } = useRedux()
  const { errorPage } = select(selectors.errors)

  return (
    <Box display="flex">
      {!errorPage && (
        <>
          {header && <Header />}
          {drawer && <Drawer />}
          <Box component="main" flexGrow={1} bgcolor="white">
            {toolbar && <Toolbar />}
            <Box display="flex" flexDirection="column" alignItems="center" p={4}>
              {!errorPage && children}
            </Box>
          </Box>
        </>
      )}

      <ErrorPage status={errorPage} />
    </Box>
  )
}
