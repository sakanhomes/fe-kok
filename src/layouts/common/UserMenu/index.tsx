import { BaseButton } from '@/components/buttons/BaseButton'
import { ProfileIcon } from '@/components/icons/ProfileIcon'
import { SignOutIcon } from '@/components/icons/SignOutIcon'
import Box from '@/styles/Box'
import React, { FC, ReactNode, useState } from 'react'
import styled, { css } from 'styled-components'
import { rgba } from 'emotion-rgba'
import useTranslation from 'next-translate/useTranslation'
import { Avatar } from '@/components/Avatar'

const Button = styled(BaseButton)<{ itemId: number; open: boolean }>((props) => {
  const { itemId, open } = props

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
    background-color: ${({ theme }) => rgba(theme.palette.accent200, 0.1)};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    justify-content: flex-start;
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
  type: 'link' | 'button'
  icon: ReactNode
}[] = [
  {
    label: 'profilePage',
    type: 'link',
    icon: <ProfileIcon />,
  },
  {
    label: 'signOut',
    type: 'link',
    icon: <SignOutIcon />,
  },
]

export const UserMenu: FC = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const { t } = useTranslation('layout')
  const openMenuToggle = () => setOpenMenu(!openMenu)

  return (
    <Box position="relative" display="flex" alignItems="center" gridGap="12px">
      {menuList.map((item, i) => (
        <Button itemId={i + 1} open={openMenu} key={item.label}>
          {item.icon}
          {t(item.label)}
        </Button>
      ))}
      <MenuButton
        onClick={openMenuToggle}
        icon={{ place: 'prepend', el: <Avatar sizes="md" /> }}
      />
    </Box>
  )
}
