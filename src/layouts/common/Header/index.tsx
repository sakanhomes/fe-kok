import { UploadIcon } from '@/components/icons/UploadIcon'
import { WalletIcon } from '@/components/icons/WalletIcon'
import Box from '@/components/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, ReactNode, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { BaseButton } from '@/components/buttons/BaseButton'
import { UploadModal } from '@/features/uploadVideo/UploadModal'
import { HEADER_HEIGHT } from '@/constants/leyout'
import { Notifications } from '@/features/notification/Notifications'
import { useOpenAuth } from '@/hooks/use-open-auth'
import { Tooltip } from '@/components/Tooltip'
import { ConnectWallet } from '@/containers/ConnectWallet'
import { Logo } from '@/components/icons/Logo'
import { ROUTES } from '@/constants/routes'
import { Link } from '@/components/Link'
import { NetworksDropdown } from '../NetworksDropdown'
import { UserMenu } from '../UserMenu'

export type THeader = {
  searchInput: ReactNode
  withSpaces: boolean
  hasBurger?: boolean
}

const ConnectWalletButton = styled(BaseButton)`
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  white-space: nowrap;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.palette.primary100};
  height: 35px;
  padding: 0 9px;
`

export const Header: FC<THeader> = ({ searchInput, withSpaces, hasBurger }) => {
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
      {hasBurger && (
        <Link href={ROUTES.HOME}>
          <Box display="flex" alignItems="center" height={103}>
            <Logo />
          </Box>
        </Link>
      )}
      <Box width="45%">{searchInput}</Box>
      <Box>
        <NetworksDropdown />
      </Box>
      <Box display="flex" gridGap="64px">
        <Notifications />
        <ConnectWallet
          onClick={() => setOpenUpload(true)}
          target={(onClick) => (
            <BaseButton onClick={onClick}>
              <UploadIcon />
            </BaseButton>
          )}
        />
        {!openAuth && (
          <Tooltip id="header_wallet_id" content={t('walletPopup')}>
            <WalletIcon />
          </Tooltip>
        )}
      </Box>
      {openAuth && (
        <ConnectWallet
          target={(onClick) => (
            <ConnectWalletButton onClick={onClick}>
              <WalletIcon />
              {t('connectWallet')}
            </ConnectWalletButton>
          )}
        />
      )}
      {!openAuth && <UserMenu />}
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
