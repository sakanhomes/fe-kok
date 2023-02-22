import { Text } from '@/components/Text'
import styled from 'styled-components'

export const StyledLabel = styled(Text).attrs<{ htmlFor?: string }>((props) => ({
  tag: 'label',
  variant: 'l2',
  ...props,
}))<{ htmlFor?: string }>`
  padding: 0 5px 6px;
`

export const ErrorComponent = styled(Text).attrs((props) => ({
  tag: 'span',
  variant: 'p3',
  ...props,
}))`
  display: block;
  margin-top: 11px;
  color: ${({ theme }) => theme.palette.danger100};
`
