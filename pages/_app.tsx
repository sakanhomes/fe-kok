import React from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from 'store'
import { Normalize } from 'styled-normalize'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GlobalError } from '@/containers/errors/GlobalError'
import { injectStore } from '@/api/rest/instance'
import { ThemeAppProvider } from '@/styles/ThemeAppProvider'
import { GlobalStyle } from '@/styles/globalStyle'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from '@/utils/web3React'
import { AuthModal } from '@/containers/auth/AuthModal'

injectStore(store)

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeAppProvider>
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
          <AuthModal />
          <Normalize />
          <Component {...pageProps} />
        </ThemeAppProvider>
      </Web3ReactProvider>
    </Provider>
  </>
)

export default MyApp
