import { BaseButton } from '@/components/buttons/BaseButton'
import { Text } from '@/components/Text'
import styled from 'styled-components'

export const ImageButton = styled(BaseButton)<{ image: string }>`
  width: 100%;
  height: 170px;
  background-image: url(${({ image }) => image});
  background-size: cover;
  border-radius: 8px;
  position: relative;
`

export const Duration = styled(Text)`
  height: 22px;
  padding: 4px 9px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.primary100};
  position: absolute;
  right: 9px;
  bottom: 6px;
  z-index: 1;
`

export const TitleButton = styled(BaseButton)`
  padding: 4px 0;
`

export const UserButton = styled(BaseButton)`
  height: 35px;
`

export const DotSeparator = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.palette.primary600};
`
