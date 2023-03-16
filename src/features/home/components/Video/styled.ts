import { BaseButton } from '@/components/buttons/BaseButton'
import { Text } from '@/components/Text'
import Box from '@/styles/Box'
import LinesEllipsis from 'react-lines-ellipsis'
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
  text-align: left;
`

export const Title = styled(LinesEllipsis)`
  height: 100%;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  color: ${({ theme }) => theme.palette.primary100};
`

export const User = styled(Box)`
  cursor: pointer;
`

export const DotSeparator = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.palette.primary600};
`
