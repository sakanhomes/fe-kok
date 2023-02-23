import { Avatar } from '@/components/Avatar'
import { Text } from '@/components/Text'
import Box from '@/styles/Box'
import Link from 'next/link'
import React, { FC, Fragment } from 'react'
import * as S from './styled'

export type TSidebarData = {
  name: string
  icon: JSX.Element
  link?: string
}[]

export const SidebarList: FC<{
  isOpen: boolean
  data: TSidebarData
  title: string
  isUsersList?: boolean
}> = ({ isOpen, data, title, isUsersList }) => (
  <Box display="grid" gridGap={[10]} my={42}>
    <S.StyledText isOpen={isOpen} variant="p4" color="secondary200">
      {title}
    </S.StyledText>
    <Box display="grid" gridGap={[30]}>
      {data.map(({ name, icon, link }) => (
        <Fragment key={name}>
          {link && (
            <Link href={link} passHref>
              <S.ItemBox
                display="flex"
                gridGap={[14]}
                alignItems="center"
                justifyContent={isOpen ? 'flex-start' : 'center'}
              >
                {!isUsersList ? icon : <Avatar />}
                {isOpen && (
                  <Text tag="span" variant="p3">
                    {name}
                  </Text>
                )}
              </S.ItemBox>
            </Link>
          )}
          {!link && (
            <S.ItemBox
              display="flex"
              gridGap={[14]}
              alignItems="center"
              justifyContent={isOpen ? 'flex-start' : 'center'}
            >
              {!isUsersList ? icon : <Avatar />}
              {isOpen && (
                <Text tag="span" variant="p3">
                  {name}
                </Text>
              )}
            </S.ItemBox>
          )}
        </Fragment>
      ))}
    </Box>
  </Box>
)
