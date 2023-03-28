import { usersApi } from '@/api/rest/users'
import { BaseButton } from '@/components/buttons/BaseButton'
import { useAuth } from '@/hooks/use-auth'
import { useRedux } from '@/hooks/use-redux'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useState } from 'react'
import styled, {
  css,
  DefaultTheme,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components'

type TButtonType = 'Main' | 'Secondary'

type TFollowingButton = {
  $type: `follow${TButtonType}` | `followed${TButtonType}`
}

const variants: {
  [key in TFollowingButton['$type']]: FlattenInterpolation<ThemeProps<DefaultTheme>>
} = {
  followMain: css`
    border: 1px solid ${({ theme }) => theme.palette.accent300};
    color: ${({ theme }) => theme.palette.accent300};
    border-radius: 8px;
    text-transform: uppercase;
  `,
  followedMain: css`
    border: none;
    background-color: ${({ theme }) => theme.palette.accent300};
    color: ${({ theme }) => theme.palette.secondary100};
    border-radius: 8px;
    text-transform: uppercase;
  `,
  followSecondary: css``,
  followedSecondary: css``,
}

const FollowButton = styled(BaseButton)<TFollowingButton>`
  min-width: 162px;
  height: 41px;
  justify-content: center;
  ${({ $type }) => variants[$type]}
`

export const FollowingButton: FC<{
  type?: TButtonType
  isSubscribed: boolean
  $address: string
}> = ({ type = 'Main', isSubscribed, $address }) => {
  const { user, address } = useAuth()
  const [subscribed, setSubscribed] = useState(isSubscribed)
  const [fetching, setFetching] = useState(false)
  const { t } = useTranslation('common')
  const { openConnectModal } = useConnectModal()
  const { dispatch } = useRedux()

  const setSubsctiptionsAsync = async () => {
    try {
      setFetching(true)
      if (!subscribed) await usersApi.setSubscribe($address)
      else await usersApi.removeSubscribe($address)
      setSubscribed(!subscribed)
    } catch (e) {
      handleActionErrors({ e, dispatch })
    } finally {
      setFetching(false)
    }
  }

  const onFollowClick = () => {
    if (!address && !user && openConnectModal) openConnectModal()
    else {
      setSubsctiptionsAsync()
    }
  }

  const name: TFollowingButton['$type'] = `${subscribed ? 'followed' : 'follow'}${type}`

  return (
    <FollowButton isLoading={fetching} $type={name} onClick={onFollowClick}>
      {t(name)}
    </FollowButton>
  )
}
