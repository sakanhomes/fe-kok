import { BaseButton } from '@/components/buttons/BaseButton'
import Box from '@/components/Box'
import { rgba } from 'emotion-rgba'
import LinesEllipsis from 'react-lines-ellipsis'
import styled from 'styled-components'

export const ImageButton = styled(BaseButton)<{ image: string }>`
  width: 134px;
  height: 98px;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 8px;
  position: relative;
`

export const TitleButton = styled(Box)`
  padding: 4px 0;
  text-align: left;
  cursor: pointer;
`

export const Duration = styled(Box)`
  background-color: ${({ theme }) => rgba(theme.palette.primary100, 0.75)};
  border-radius: 4px;
`

export const Title = styled(LinesEllipsis)`
  height: 100%;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  margin-bottom: 5px;
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
