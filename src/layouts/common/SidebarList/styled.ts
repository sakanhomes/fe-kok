import Box from '@/styles/Box'
import styled from 'styled-components'
import { Text } from '@/components/Text'

export const StyledText = styled(Text)<{ isOpen: boolean }>`
  ${({ isOpen }) => !isOpen && 'text-align: center;'}
`

export const ItemBox = styled(Box)`
  cursor: pointer;
  span {
    white-space: nowrap;
  }
`
