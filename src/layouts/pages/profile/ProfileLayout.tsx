import { BaseButton } from '@/components/buttons/BaseButton'
import { ROUTES } from '@/constants/routes'
import Box from '@/components/Box'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'

type TProfileLayout = {
  header: ReactNode
}

const navigation = [
  {
    label: 'settings',
    route: ROUTES.PROFILE,
  },
  {
    label: 'follower',
    route: ROUTES.PROFILE_FOLLOWER,
  },
  {
    label: 'following',
    route: ROUTES.PROFILE_FOLLOWING,
  },
  {
    label: 'favorite',
    route: ROUTES.PROFILE_FAVORITE,
  },
  {
    label: 'collection',
    route: ROUTES.PROFILE_COLLECTION,
  },
  {
    label: 'history',
    route: ROUTES.PROFILE_HISTORY,
  },
]

const Button = styled(BaseButton)<{ $active: boolean }>((props) => {
  const { theme, $active } = props

  return css`
    font-weight: ${$active ? 700 : 300};
    font-size: 17px;
    line-height: 20px;
    justify-content: center;
    color: ${$active ? theme.palette.secondary100 : theme.palette.primary100};
    background-color: ${$active ? theme.palette.accent300 : theme.palette.secondary300};
  `
})

const ProfileNavigation: FC = () => {
  const { push, pathname } = useRouter()
  const { t } = useTranslation('settings')

  return (
    <Box height="50px" display="grid" gridTemplateColumns="repeat(6, 1fr)">
      {navigation.map(({ label, route }) => (
        <Button $active={route === pathname} key={label} onClick={() => push(route)}>
          {t(label)}
        </Button>
      ))}
    </Box>
  )
}

export const ProfileLayout: FC<TProfileLayout> = ({ header, children }) => (
  <Box>
    <Box overflow="hidden" height={214}>
      {header}
    </Box>
    <ProfileNavigation />
    <Box>{children}</Box>
  </Box>
)
