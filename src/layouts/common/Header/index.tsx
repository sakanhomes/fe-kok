import { UploadIcon } from '@/components/icons/UploadIcon'
import { WalletIcon } from '@/components/icons/WalletIcon'
import { useAuth } from '@/hooks/use-auth'
import Box from '@/styles/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, ReactNode, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { BaseButton } from '@/components/buttons/BaseButton'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { UploadModal } from '@/features/uploadVideo/UploadModal'
import { HEADER_HEIGHT } from '@/constants/leyout'
import { Notifications } from '@/features/notification/Notifications'
import { useOpenAuth } from '@/hooks/use-open-auth'
import { NetworksDropdown } from '../NetworksDropdown'
import { UserMenu } from '../UserMenu'

export type THeader = {
  searchInput: ReactNode
  withSpaces: boolean
}

const ConnectWallet = styled(BaseButton)`
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  white-space: nowrap;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.palette.primary100};
  height: 35px;
  padding: 0 9px;
`

export const Header: FC<THeader> = ({ searchInput, withSpaces }) => {
  const { user } = useAuth()
  const openAuth = useOpenAuth()
  const { t } = useTranslation('layout')
  const { palette } = useTheme()
  const [openUpload, setOpenUpload] = useState(false)

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gridGap="60px"
      minHeight={HEADER_HEIGHT}
      backgroundColor={palette.secondary100}
      padding={withSpaces ? '0 44px 0 35px' : undefined}
    >
      <Box width="45%">{searchInput}</Box>
      <Box>
        <NetworksDropdown />
      </Box>
      <Box display="flex" gridGap="64px">
        <Notifications />
        <BaseButton
          onClick={() => {
            if (openAuth) openAuth()
            else setOpenUpload(true)
          }}
        >
          <UploadIcon />
        </BaseButton>
        {user && (
          <a href="https://app.uniswap.org/#/swap" target="_blank" rel="noreferrer">
            <WalletIcon />
          </a>
        )}
      </Box>
      {!user && (
        <ConnectButton.Custom>
          {({ account, chain, openConnectModal, authenticationStatus, mounted }) => {
            const ready = mounted && authenticationStatus !== 'loading'
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus || authenticationStatus === 'authenticated')

            return (
              <div>
                {(() => {
                  if (!connected) {
                    return (
                      <ConnectWallet onClick={openConnectModal}>
                        <WalletIcon />
                        {t('connectWallet')}
                      </ConnectWallet>
                    )
                  }
                })()}
              </div>
            )
          }}
        </ConnectButton.Custom>
      )}
      {user && <UserMenu />}
      {openUpload && (
        <UploadModal
          open={openUpload}
          onClose={() => {
            setOpenUpload(false)
          }}
        />
      )}
    </Box>
  )
}
