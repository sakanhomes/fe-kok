import { LanguageIcon } from '@/components/icons/LanguageIcon'
import { SideExpandIcon } from '@/components/icons/SideExpandIcon'
import { Text } from '@/components/Text'
import { ROUTES } from '@/constants/routes'
import Box from '@/styles/Box'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React, { FC, Fragment } from 'react'
import { BaseButton } from '@/components/buttons/BaseButton'
import { SidebarList } from '../SidebarList'
import { followingMockData, menuData } from './data'
import * as S from './styled'

export const SideMenu: FC<{ open: boolean; toggleMenu: () => void }> = ({
  open,
  toggleMenu,
}) => {
  const { t } = useTranslation('layout')
  return (
    <S.Wrapper open={open} onClick={!open ? toggleMenu : undefined}>
      <Link href={ROUTES.HOME} passHref>
        <S.StyledLogo open={open} />
      </Link>
      <SidebarList title={t('menu')} data={menuData} isOpen={open} />
      <SidebarList
        title={t('following')}
        data={followingMockData}
        isOpen={open}
        isUsersList
      />
      {open && (
        <>
          <Box display="flex" mb="22px" gridGap={[14]} alignItems="center">
            <LanguageIcon />
            <Text tag="span" variant="p3">
              English
            </Text>
          </Box>
          <BaseButton onClick={toggleMenu}>
            <SideExpandIcon isOpen={open} />
          </BaseButton>
        </>
      )}
    </S.Wrapper>
  )
}
