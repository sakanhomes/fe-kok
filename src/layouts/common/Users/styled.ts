import Box from '@/components/Box'
import styled, { css } from 'styled-components'
import { Text } from '@/components/Text'

export const StyledText = styled(Text)<{ isOpen: boolean }>(({ isOpen }) => {
  const openStyle = css`
    max-width: 0;
  `
  const closeStyle = css`
    max-width: 115px;
  `
  return css`
    transition: 300ms;
    text-align: center;
    ${isOpen ? openStyle : closeStyle}
  `
})

export const UserName = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
  transition: 300ms;
`

export const ItemBox = styled(Box)<{ isOpen: boolean }>(({ isOpen }) => {
  const openStyle = css``
  const closeStyle = css`
    margin-left: 44px;
    ${UserName} {
      max-width: 0;
    }
  `
  return css`
    cursor: pointer;
    transition: 300ms;
    ${isOpen ? openStyle : closeStyle}
    span {
      white-space: nowrap;
    }
  `
})
