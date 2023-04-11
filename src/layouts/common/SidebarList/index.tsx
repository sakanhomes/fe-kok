import Box from '@/styles/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAuth } from '@/hooks/use-auth'
import { useRedux } from '@/hooks/use-redux'
import { setCommingSoon } from '@/containers/comming-soon/store'
import { TIcon } from '@/components/icons/type'
import * as S from './styled'

export type TSidebarData = {
  name: string
  icon: (props: TIcon) => JSX.Element
  link?: string
  isPrivate?: boolean
}[]

export const SidebarList: FC<{
  isOpen: boolean
  data: TSidebarData
  title: string
}> = ({ isOpen, data, title }) => {
  const { t } = useTranslation('layout')
  const router = useRouter()
  const { openConnectModal } = useConnectModal()
  const { user, address } = useAuth()
  const { dispatch } = useRedux()

  return (
    <Box display="grid" gridGap={[10]} my={42}>
      <S.StyledText isOpen={isOpen} variant="p4" color="secondary200">
        {title}
      </S.StyledText>
      <Box display="grid" gridGap={[30]}>
        {data.map(({ name, icon, link, isPrivate }) => {
          const isStartsWith = !!link && router.pathname.startsWith(link)
          const totalEqual = router.pathname === link
          const active = isStartsWith && totalEqual

          return (
            <S.ItemBox
              key={name}
              isOpen={isOpen}
              onClick={() => {
                if (!link) return dispatch(setCommingSoon(true))
                if (isPrivate && (!user || !address) && openConnectModal)
                  openConnectModal()
                else router.push(link)
              }}
              display="flex"
              gridGap={[14]}
              alignItems="center"
              active={active}
            >
              {icon({
                color: active ? 'accent300' : undefined,
                strokeWidth: active ? 2 : undefined,
              })}
              <S.MenuText tag="span" variant="p3">
                {t(name)}
              </S.MenuText>
            </S.ItemBox>
          )
        })}
      </Box>
    </Box>
  )
}
