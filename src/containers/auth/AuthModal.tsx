import React, { FC, useEffect, useState } from 'react'
import { useRedux } from '@/hooks/use-redux'
import { Modal } from '@/components/modals/Modal'
import { Text } from '@/components/Text'
import { WalletIcons } from '@/components/icons/WalletIcons'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { injected } from '@/utils/web3React'
import { actions, actionsAsync, authSelector } from './store'
import * as S from './styled'
import { authApi } from './api/auth'

export const AuthModal: FC = () => {
  const { select, dispatch } = useRedux()
  const { openAuthModal } = select(authSelector)

  const [provider, setProvider] = useState<Web3Provider>()
  const { active, activate, connector, account } = useWeb3React()

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const newProvider = new Web3Provider(window.ethereum)
      setProvider(newProvider)
    }
  }, [])

  useEffect(() => {
    if (account && provider) {
      const getNonceAsync = async () => {
        try {
          const {
            data: {
              data: { nonce },
            },
          } = await authApi.nonce(account)
          const signer = provider.getSigner(account)
          const signature = await signer.signMessage(nonce)

          dispatch(actionsAsync.loginAsync({ address: account, signature }))
        } catch (err) {
          console.error(err)
        }
      }
      getNonceAsync()
    }
  }, [account])

  return (
    <Modal
      maxWidth="522px"
      onClose={() => dispatch(actions.setOpenModal(false))}
      open={openAuthModal}
    >
      <Text variant="h7" tag="h2" margin="20px 0 26px 25px">
        Select a wallet
      </Text>
      <S.Button
        onClick={() => {
          activate(injected)
        }}
      >
        <WalletIcons wallet="METAMASK" />
        Metamask
      </S.Button>
      {active ? (
        <div>
          <p>Connected with {connector?.constructor?.name}</p>
          <p>Account: {account}</p>
        </div>
      ) : (
        <p>Not connected</p>
      )}
    </Modal>
  )
}
