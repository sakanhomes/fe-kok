import { LanguageIcon } from '@/components/icons/LanguageIcon'
import { Text } from '@/components/Text'
import { ROUTES } from '@/constants/routes'
import Box from '@/components/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useState } from 'react'
import { Logo } from '@/components/icons/Logo'
import { useAuth } from '@/hooks/use-auth'
import { SIDEBAR_CLOSE_WIDTH } from '@/constants/leyout'
import { SideExpandIcon } from '@/components/icons/SideExpandIcon'
import { Link } from '@/components/Link'
import { SidebarList } from '../SidebarList'
import { menuData } from './data'
import * as S from './styled'
import { Users } from '../Users'
import { StaticLinks } from '../StaticLinks'

export const SideMenu: FC<{ hasBurger?: boolean }> = ({ hasBurger }) => {
  const { t } = useTranslation('layout')
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const openMenuToggle = () => setOpen(!open)

  const wrapperEvents = !hasBurger
    ? {
        onMouseEnter: !open ? openMenuToggle : undefined,
        onMouseLeave: open ? openMenuToggle : undefined,
      }
    : {}

  return (
    <>
      {!hasBurger && <Box minWidth={SIDEBAR_CLOSE_WIDTH} />}
      {hasBurger && (
        <Box mt={98}>
          <S.BurgerButton onClick={openMenuToggle}>
            <SideExpandIcon isOpen={false} />
          </S.BurgerButton>
        </Box>
      )}
      <S.Wrapper open={open} hasBurger={hasBurger} {...wrapperEvents}>
        <Link href={ROUTES.HOME}>
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
          {hasBurger && (
            <Box mb="23px">
              <S.BurgerButton isOpen onClick={openMenuToggle}>
                <SideExpandIcon isOpen />
              </S.BurgerButton>
            </Box>
          )}
          <StaticLinks />
        </S.AdditionalBox>
      </S.Wrapper>
    </>
  )
}
