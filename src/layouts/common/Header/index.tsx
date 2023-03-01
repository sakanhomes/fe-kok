import { NotificationIcon } from '@/components/icons/NotificationIcon'
import { UploadIcon } from '@/components/icons/UploadIcon'
import { WalletIcon } from '@/components/icons/WalletIcon'
import { useAuth } from '@/hooks/use-auth'
import Box from '@/styles/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { BaseButton } from '@/components/buttons/BaseButton'
import { useRedux } from '@/hooks/use-redux'
import { actions } from '@/containers/auth'
import { NetworksDropdown } from '../NetworksDropdown'
import { UserMenu } from '../UserMenu'

export type THeader = {
  searchInput: ReactNode
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

export const Header: FC<THeader> = ({ searchInput }) => {
  const { user } = useAuth()
  const { dispatch } = useRedux()
  const { t } = useTranslation('layout')

  const onConnectWallet = () => {
    dispatch(actions.setOpenModal(true))
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gridGap="60px"
      minHeight={80}
    >
      <Box width="45%">{searchInput}</Box>
      <Box>
        <NetworksDropdown />
      </Box>
      <Box display="flex" gridGap="64px">
        <BaseButton>
          <NotificationIcon />
        </BaseButton>
        <BaseButton>
          <UploadIcon />
        </BaseButton>
        {user && (
          <a href="https://app.uniswap.org/#/swap" target="_blank" rel="noreferrer">
            <WalletIcon />
          </a>
        )}
      </Box>
      {!user && (
        <ConnectWallet
          onClick={onConnectWallet}
          icon={{ place: 'prepend', el: <WalletIcon width="25" height="18" /> }}
        >
          {t('connectWallet')}
        </ConnectWallet>
      )}
      {user && <UserMenu />}
    </Box>
  )
}
