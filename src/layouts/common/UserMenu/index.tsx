import { BaseButton } from '@/components/buttons/BaseButton'
import { ProfileIcon } from '@/components/icons/ProfileIcon'
import { SignOutIcon } from '@/components/icons/SignOutIcon'
import Box from '@/components/Box'
import React, { FC, ReactNode, useState } from 'react'
import styled, { css, useTheme } from 'styled-components'
import { rgba } from 'emotion-rgba'
import useTranslation from 'next-translate/useTranslation'
import { Avatar } from '@/components/Avatar'
import { useRouter } from 'next/router'
import { ROUTES } from '@/constants/routes'
import { useDisconnect } from 'wagmi'
import { useAuth } from '@/hooks/use-auth'

const Button = styled(BaseButton)<{ itemId: number; open: boolean }>((props) => {
  const { itemId, open, theme } = props

  const closedStyles = css`
    opacity: 0;
    pointer-events: none;
    transform: translateX(calc(-100% + 50px));
  `
  const openStyles = css`
    opacity: 1;
    transform: translateY(calc(${itemId * 100}% + ${itemId * 4}px))
      translateX(calc(-100% + 50px));
  `
  const baseStyles = css`
    position: absolute;
    left: 0;
    z-index: 1;
    transition: 0.3s;
    width: 140px;
    white-space: nowrap;
    height: 40px;
    padding: 0 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    justify-content: flex-start;
    :before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      border-radius: 5px;
      background-color: ${theme.palette.secondary100};
    }
    :after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      border-radius: 5px;
      background-color: ${rgba(theme.palette.accent200, 0.1)};
    }
  `
  return css`
    ${baseStyles}
    ${open ? openStyles : closedStyles}
  `
})

const MenuButton = styled(BaseButton)`
  position: relative;
  z-index: 2;
`

const menuList: {
  label: string
  route?: keyof typeof ROUTES
  icon: ReactNode
}[] = [
  {
    label: 'profilePage',
    route: 'PROFILE',
    icon: <ProfileIcon />,
  },
  {
    label: 'signOut',
    icon: <SignOutIcon />,
  },
]

export const UserMenu: FC = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const { t } = useTranslation('layout')
  const openMenuToggle = () => setOpenMenu(!openMenu)
  const router = useRouter()
  const { disconnect } = useDisconnect()
  const { logoutAsync, user } = useAuth()
  const theme = useTheme()
  return (
    <Box
      position="relative"
      display="flex"
      bg={theme.palette.secondary100}
      alignItems="center"
      gridGap="12px"
    >
      {menuList.map((item, i) => (
        <Button
          itemId={i + 1}
          onClick={() => {
            if (item.route) {
              router.push(ROUTES[item.route])
            } else {
              logoutAsync()
              disconnect()
            }
          }}
          open={openMenu}
          key={item.label}
        >
          {item.icon}
          {t(item.label)}
        </Button>
      ))}
      <MenuButton
        onClick={openMenuToggle}
        icon={{ place: 'prepend', el: <Avatar sizes="md" avatar={user?.profileImage} /> }}
      />
    </Box>
  )
}
