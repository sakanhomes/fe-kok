import Box from '@/styles/Box'
import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from '@/constants/routes'
import { Avatar } from '@/components/Avatar'
import { useAuth } from '@/hooks/use-auth'
import { Tooltip } from '@/components/Tooltip'
import * as S from './styled'

export const Users: FC<{
  isOpen: boolean
  title: string
}> = ({ isOpen, title }) => {
  const router = useRouter()
  const { subscriptions } = useAuth()

  return (
    <Box display="grid" gridGap={[10]} my={42}>
      <S.StyledText isOpen={isOpen} variant="p4" color="secondary200">
        {title}
      </S.StyledText>
      <Box display="grid" gridGap={[30]}>
        {subscriptions.map(({ name, address, profileImage }) => (
          <Tooltip
            id={`${address}_sidebar_following`}
            content={name ?? address}
            key={name}
          >
            <S.ItemBox
              onClick={() =>
                router.push({ pathname: `${ROUTES.CREATOR_PAGE}/${address}` })
              }
              display="flex"
              gridGap={[14]}
              isOpen={isOpen}
              alignItems="center"
            >
              <Avatar avatar={profileImage} />
              {isOpen && (
                <S.UserName tag="span" variant="p3">
                  {name ?? address}
                </S.UserName>
              )}
            </S.ItemBox>
          </Tooltip>
        ))}
      </Box>
    </Box>
  )
}
