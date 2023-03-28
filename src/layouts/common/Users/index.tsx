import Box from '@/styles/Box'
import React, { FC, Fragment } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from '@/constants/routes'
import { Avatar } from '@/components/Avatar'
import { useAuth } from '@/hooks/use-auth'
import * as S from './styled'

export const Users: FC<{
  isOpen: boolean
  title: string
}> = ({ isOpen, title }) => {
  const { push } = useRouter()
  const { subscriptions } = useAuth()

  return (
    <Box display="grid" gridGap={[10]} my={42}>
      <S.StyledText isOpen={isOpen} variant="p4" color="secondary200">
        {title}
      </S.StyledText>
      <Box display="grid" gridGap={[30]}>
        {subscriptions.map(({ name, address, profileImage }) => (
          <Fragment key={name}>
            <S.ItemBox
              onClick={() => push({ pathname: `${ROUTES.CREATOR_PAGE}/${address}` })}
              display="flex"
              gridGap={[14]}
              alignItems="center"
              justifyContent={isOpen ? 'flex-start' : 'center'}
            >
              <Avatar avatar={profileImage} />
              {isOpen && (
                <S.UserName tag="span" variant="p3">
                  {name ?? address}
                </S.UserName>
              )}
            </S.ItemBox>
          </Fragment>
        ))}
      </Box>
    </Box>
  )
}
