import { Text } from '@/components/Text'
import Box from '@/styles/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, Fragment } from 'react'
import { Avatar } from '@/components/Avatar'
import { useRouter } from 'next/router'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAuth } from '@/hooks/use-auth'
import { useRedux } from '@/hooks/use-redux'
import { setCommingSoon } from '@/containers/comming-soon/store'
import * as S from './styled'

export type TSidebarData = {
  name: string
  icon: JSX.Element
  link?: string
  isPrivate?: boolean
  commingSoon?: boolean
}[]

export const SidebarList: FC<{
  isOpen: boolean
  data: TSidebarData
  title: string
  isUsersList?: boolean
}> = ({ isOpen, data, title, isUsersList }) => {
  const { t } = useTranslation('layout')
  const router = useRouter()
  const { openConnectModal } = useConnectModal()
  const { user } = useAuth()
  const { dispatch } = useRedux()

  return (
    <Box display="grid" gridGap={[10]} my={42}>
      <S.StyledText isOpen={isOpen} variant="p4" color="secondary200">
        {title}
      </S.StyledText>
      <Box display="grid" gridGap={[30]}>
        {data.map(({ name, icon, link, isPrivate, commingSoon }) => (
          <Fragment key={name}>
            {link && (
              <S.ItemBox
                onClick={() => {
                  if (isPrivate && !user && openConnectModal) openConnectModal()
                  else router.push(link)
                  if (commingSoon) dispatch(setCommingSoon(true))
                }}
                display="flex"
                gridGap={[14]}
                alignItems="center"
                justifyContent={isOpen ? 'flex-start' : 'center'}
                isUsersList={isUsersList}
              >
                {!isUsersList ? icon : <Avatar />}
                {isOpen && (
                  <Text tag="span" variant="p3">
                    {t(name)}
                  </Text>
                )}
              </S.ItemBox>
            )}
            {!link && (
              <S.ItemBox
                display="flex"
                gridGap={[14]}
                alignItems="center"
                justifyContent={isOpen ? 'flex-start' : 'center'}
                isUsersList={isUsersList}
                onClick={() => commingSoon && dispatch(setCommingSoon(true))}
              >
                {!isUsersList ? icon : <Avatar />}
                {isOpen && (
                  <Text tag="span" variant="p3">
                    {t(name)}
                  </Text>
                )}
              </S.ItemBox>
            )}
          </Fragment>
        ))}
      </Box>
    </Box>
  )
}
