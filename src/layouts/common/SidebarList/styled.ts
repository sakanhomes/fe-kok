import { Text } from '@/components/Text'
import Box from '@/styles/Box'
import styled from 'styled-components'

export const StyledText = styled(Text)<{ isOpen: boolean }>`
  ${({ isOpen }) => !isOpen && 'text-align: center;'}
`

export const ItemBox = styled(Box)`
  cursor: pointer;
`
