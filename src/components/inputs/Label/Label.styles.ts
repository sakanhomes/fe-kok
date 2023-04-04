import { Text } from '@/components/Text'
import styled from 'styled-components'

export const StyledLabel = styled(Text).attrs<{ htmlFor?: string }>((props) => ({
  tag: 'label',
  variant: 'l2',
  ...props,
}))<{ htmlFor?: string }>`
  padding-bottom: 12px;
  display: inline-block;
  width: 100%;
`

export const ErrorComponent = styled(Text).attrs((props) => ({
  tag: 'span',
  variant: 'l2',
  ...props,
}))`
  display: block;
  margin-top: 11px;
  color: ${({ theme }) => theme.palette.danger100};
`
