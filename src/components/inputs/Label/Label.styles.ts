import { Text } from '@/components/Text'
import styled from 'styled-components'

export const StyledLabel = styled(Text).attrs<{
  htmlFor?: string
}>((props) => ({
  tag: 'label',
  variant: 'l2',
  ...props,
}))<{ htmlFor?: string }>`
  display: inline-block;
  width: 100%;
  margin-bottom: 12px;
`

export const ErrorComponent = styled(Text).attrs((props) => ({
  tag: 'span',
  variant: 'l2',
  ...props,
}))`
  display: block;
  color: ${({ theme }) => theme.palette.danger100};
  position: absolute;
  bottom: -25px;
`

export const LabelText = styled.span`
  display: inline-block;
`
