import React from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from 'store'
import { Normalize } from 'styled-normalize'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// eslint-disable-next-line import/no-unresolved
import { GlobalError } from '@/containers/errors/GlobalError'
import { injectStore } from '@/api/rest/instance'
import { ThemeAppProvider } from '@/styles/ThemeAppProvider'
import { GlobalStyle } from '@/styles/globalStyle'
// import { Icon } from '@/components/Icon'
// import '@/styling/fonts.css'

injectStore(store)

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Provider store={store}>
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
          // closeButton={<Icon id="close" color="basic300" />}
        />
        <GlobalError />
        <Normalize />
        <Component {...pageProps} />
      </ThemeAppProvider>
    </Provider>
  </>
)

export default MyApp
