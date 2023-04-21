import { LanguageIcon } from '@/components/icons/LanguageIcon'
import { Text } from '@/components/Text'
import { ROUTES } from '@/constants/routes'
import Box from '@/components/Box'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React, { FC } from 'react'
import { Logo } from '@/components/icons/Logo'
import { useAuth } from '@/hooks/use-auth'
import { SIDEBAR_CLOSE_WIDTH } from '@/constants/leyout'
import { SidebarList } from '../SidebarList'
import { menuData } from './data'
import * as S from './styled'
import { Users } from '../Users'
import { StaticLinks } from '../StaticLinks'

export const SideMenu: FC<{ open: boolean; toggleMenu: () => void }> = ({
  open,
  toggleMenu,
}) => {
  const { t } = useTranslation('layout')
  const { user } = useAuth()

  return (
    <>
      <Box minWidth={SIDEBAR_CLOSE_WIDTH} />
      <S.Wrapper
        open={open}
        onMouseEnter={!open ? toggleMenu : undefined}
        onMouseLeave={open ? toggleMenu : undefined}
      >
        <Link href={ROUTES.HOME} passHref>
          <S.StyledLogo>
            <Logo />
          </S.StyledLogo>
        </Link>
        <SidebarList title={t('menu')} data={menuData} isOpen={open} />
        {user && <Users title={t('following')} isOpen={open} />}
        <S.AdditionalBox isOpen={open}>
          <Box display="flex" mb="22px" gridGap={[14]} alignItems="center">
            <LanguageIcon />
            <Text tag="span" variant="p3">
              English
            </Text>
          </Box>
          <StaticLinks />
        </S.AdditionalBox>
      </S.Wrapper>
    </>
  )
}
