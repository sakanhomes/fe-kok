import { LanguageIcon } from '@/components/icons/LanguageIcon'
import { Text } from '@/components/Text'
import { ROUTES } from '@/constants/routes'
import Box from '@/styles/Box'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React, { FC } from 'react'
import { Logo } from '@/components/icons/Logo'
import { useAuth } from '@/hooks/use-auth'
import { SidebarList } from '../SidebarList'
import { followingMockData, menuData } from './data'
import * as S from './styled'

export const SideMenu: FC<{ open: boolean; toggleMenu: () => void }> = ({
  open,
  toggleMenu,
}) => {
  const { t } = useTranslation('layout')
  const { user } = useAuth()

  return (
    <S.Wrapper
      open={open}
      onMouseEnter={!open ? toggleMenu : undefined}
      onMouseLeave={open ? toggleMenu : undefined}
    >
      <Link href={ROUTES.HOME} passHref>
        <S.StyledLogo open={open}>
          <Logo />
        </S.StyledLogo>
      </Link>
      <SidebarList title={t('menu')} data={menuData} isOpen={open} />
      {user && (
        <SidebarList
          title={t('following')}
          data={followingMockData}
          isOpen={open}
          isUsersList
        />
      )}
      {open && (
        <Box display="flex" mb="22px" gridGap={[14]} alignItems="center">
          <LanguageIcon />
          <Text tag="span" variant="p3">
            English
          </Text>
        </Box>
      )}
    </S.Wrapper>
  )
}
