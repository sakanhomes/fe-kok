import { BaseButton } from '@/components/buttons/BaseButton'
import { LanguageIcon } from '@/components/icons/LanguageIcon'
import { SideExpandIcon } from '@/components/icons/SideExpandIcon'
import { Text } from '@/components/Text'
import { ROUTES } from '@/constants/routes'
import Box from '@/styles/Box'
import Link from 'next/link'
import React, { FC, Fragment } from 'react'
import { SidebarList } from '../SidebarList'
import { followingMockData, menuData } from './data'
import * as S from './styled'

export const SideMenu: FC<{ open: boolean; toggleMenu: () => void }> = ({
  open,
  toggleMenu,
}) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <S.Wrapper open={open} onClick={!open ? toggleMenu : undefined}>
    <Link href={ROUTES.HOME} passHref>
      <S.StyledLogo open={open} />
    </Link>
    <SidebarList title="Menu" data={menuData} isOpen={open} />
    <SidebarList title="FOLLOWING" data={followingMockData} isOpen={open} isUsersList />
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
