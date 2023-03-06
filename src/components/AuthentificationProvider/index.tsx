import React, { FC, useMemo, useState } from 'react'

import { SiweMessage } from 'siwe'
import { authApi } from '@/api/rest/api/auth'
import { useRedux } from '@/hooks/use-redux'
import { actionsAsync } from 'store/auth'

import {
  connectorsForWallets,
  RainbowKitProvider,
  RainbowKitAuthenticationProvider,
  createAuthenticationAdapter,
  AuthenticationConfig,
} from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig, useAccount } from 'wagmi'
import { mainnet, polygon, bsc } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import {
  rainbowWallet,
  trustWallet,
  imTokenWallet,
  metaMaskWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { rainbowkitStyles } from '@/styles/raibowkitStyles'
import { useTheme } from 'styled-components'

const { chains, provider } = configureChains(
  [mainnet, polygon, bsc],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID ?? '' }), publicProvider()]
)

const connectors = connectorsForWallets([
  {
    groupName: 'Available',
    wallets: [
      metaMaskWallet({ chains }),
      coinbaseWallet({ chains, appName: 'Coinbase' }),
      trustWallet({ chains }),
      imTokenWallet({ chains }),
      rainbowWallet({ chains }),
    ],
  },
])

const wagmiClient = createClient({
  connectors,
  provider,
})

export const AuthentificationProvider: FC = ({ children }) => {
  const { address } = useAccount()
  const { dispatch } = useRedux()
  const [status, setStatus] =
    useState<AuthenticationConfig<string>['status']>('unauthenticated')
  const theme = useTheme()

  const authenticationAdapter = useMemo(
    () =>
      createAuthenticationAdapter({
        getNonce: async () => {
          setStatus('unauthenticated')
          const {
            data: {
              data: { nonce },
            },
          } = await authApi.nonce(address ?? '0x')
          return nonce
        },
        createMessage: ({ nonce, address, chainId }) =>
          new SiweMessage({
            domain: window.location.host,
            address,
            statement: 'Sign in with Ethereum to the app.',
            uri: window.location.origin,
            version: '1',
            chainId,
            nonce,
          }),

        getMessageBody: ({ message }) => {
          const typedMessage = message as { nonce: string }
          return typedMessage.nonce
        },

        verify: async ({ signature }) => {
          const verifyRes = await authApi.login({ address: address ?? '0x', signature })
          dispatch(actionsAsync.getProfileAsync())
          setStatus('authenticated')
          return Boolean(verifyRes.data.status === 200)
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        signOut: async () => {},
      }),
    [address]
  )

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitAuthenticationProvider
        adapter={authenticationAdapter}
        enabled={!!address}
        status={status}
      >
        <RainbowKitProvider theme={rainbowkitStyles(theme)} chains={chains}>
          {children}
        </RainbowKitProvider>
      </RainbowKitAuthenticationProvider>
    </WagmiConfig>
  )
}
