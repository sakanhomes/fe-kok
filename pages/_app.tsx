import React from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from 'store'
import { Normalize } from 'styled-normalize'
import { ToastContainer } from 'react-toastify'
import { GlobalError } from '@/containers/errors/GlobalError'
import { injectStore } from '@/api/rest/instance'
import { ThemeAppProvider } from '@/styles/ThemeAppProvider'
import { GlobalStyle } from '@/styles/globalStyle'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { InitUser } from '@/containers/permissions/InitUser'

import '@rainbow-me/rainbowkit/styles.css'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-toastify/dist/ReactToastify.css'

import { AuthentificationProvider } from '@/components/AuthentificationProvider'
import { CommingSoon } from '@/containers/comming-soon/CommingSoon'

injectStore(store)

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Provider store={store}>
      <ThemeAppProvider>
        <AuthentificationProvider>
          <InitUser />
          <GlobalStyle />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            closeButton={<CloseIcon color="primary100" />}
          />
          <GlobalError />
          <CommingSoon />
          <Normalize />
          <Component {...pageProps} />
        </AuthentificationProvider>
      </ThemeAppProvider>
    </Provider>
  </>
)

export default MyApp
