import Box from '@/styles/Box'
import styled from 'styled-components'
import { Text } from '@/components/Text'

export const StyledText = styled(Text)<{ isOpen: boolean }>`
  ${({ isOpen }) => !isOpen && 'text-align: center;'}
`

export const ItemBox = styled(Box)`
  cursor: pointer;
`

export const UserName = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
`
