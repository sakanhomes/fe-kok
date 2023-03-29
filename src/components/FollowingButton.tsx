import { usersApi } from '@/api/rest/users'
import { BaseButton } from '@/components/buttons/BaseButton'
import { useAuth } from '@/hooks/use-auth'
import { useRedux } from '@/hooks/use-redux'
import { IPalette } from '@/styles/styled'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, MouseEventHandler, useEffect, useState } from 'react'
import { actionsAsync } from 'store/auth'
import styled, {
  css,
  DefaultTheme,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components'
import { FollowedIcon } from './icons/FollowedIcon'
import { UnfollowedIcon } from './icons/UnfollowedIcon'

type TButtonType = 'Main' | 'Secondary'

type TFollowingButton = {
  $type: `follow${TButtonType}` | `followed${TButtonType}`
  color?: keyof IPalette
}

const variants: {
  [key in TFollowingButton['$type']]: FlattenInterpolation<ThemeProps<DefaultTheme>>
} = {
  followMain: css`
    border: 1px solid ${({ theme }) => theme.palette.accent300};
    color: ${({ theme }) => theme.palette.accent300};
    border-radius: 8px;
    text-transform: uppercase;
    min-width: 162px;
  `,
  followedMain: css`
    border: none;
    background-color: ${({ theme }) => theme.palette.accent300};
    color: ${({ theme }) => theme.palette.secondary100};
    border-radius: 8px;
    text-transform: uppercase;
    min-width: 162px;
  `,
  followSecondary: css``,
  followedSecondary: css``,
}

const FollowButton = styled(BaseButton)<TFollowingButton>`
  height: 41px;
  justify-content: center;
  ${({ $type }) => variants[$type]}
  width: fit-content;
  ${({ theme, color }) => color && `color: ${theme.palette[color]};`}
  ${({ theme, color }) => color && `border-color: ${theme.palette[color]};`}
`

export const FollowingButton: FC<{
  type?: TButtonType
  isSubscribed: boolean
  $address: string
  color?: keyof IPalette
}> = ({ type = 'Main', isSubscribed, $address, color }) => {
  const { user, address } = useAuth()
  const [subscribed, setSubscribed] = useState(false)
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
      dispatch(actionsAsync.getSubscriptionsAsync())
    } catch (e) {
      handleActionErrors({ e, dispatch })
    } finally {
      setFetching(false)
    }
  }

  const onFollowClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    if (!address && !user && openConnectModal) openConnectModal()
    else {
      setSubsctiptionsAsync()
    }
  }

  useEffect(() => {
    setSubscribed(isSubscribed)
  }, [isSubscribed])

  const name: TFollowingButton['$type'] = `${subscribed ? 'followed' : 'follow'}${type}`

  return (
    <FollowButton
      isLoading={fetching}
      color={color}
      icon={
        type === 'Secondary'
          ? {
              place: 'prepend',
              el: subscribed ? (
                <FollowedIcon color="primary100" />
              ) : (
                <UnfollowedIcon color="primary300" />
              ),
            }
          : undefined
      }
      $type={name}
      onClick={onFollowClick}
    >
      {t(name)}
    </FollowButton>
  )
}
