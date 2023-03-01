import { BaseButton } from '@/components/buttons/BaseButton'
import { rgba } from 'emotion-rgba'
import styled from 'styled-components'

export const Button = styled(BaseButton)`
  height: 48px;
  padding: 0 33px;
  background-color: ${({ theme }) => rgba(theme.palette.secondary200, 0.5)};
  border-radius: 8px;
  width: 100%;
`
