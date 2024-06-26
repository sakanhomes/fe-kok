import styled from 'styled-components'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { FC } from 'react'
import Box from '@/styles/Box'

export const StyledTooltip = styled(ReactTooltip)`
  background-color: ${({ theme }) => theme.palette.secondary300};
  color: ${({ theme }) => theme.palette.primary100};
  padding: 10px;
  opacity: 1;
  border-radius: 8px;
  max-width: 40%;
  z-index: 1;
`

export const Tooltip: FC<{
  id: string
  content: string
  showDelay?: number
  hideDelay?: number
  isFloat?: boolean
  isTooltiped?: boolean
  place?: 'top' | 'bottom' | 'left' | 'right'
}> = ({
  id,
  children,
  content,
  showDelay = 200,
  hideDelay = 0,
  isFloat,
  isTooltiped = true,
  place = 'bottom',
}) => (
  <>
    <Box data-tooltip-id={id} data-tip>
      {children}
    </Box>
    {isTooltiped && (
      <StyledTooltip
        noArrow
        float={isFloat}
        delayShow={showDelay}
        delayHide={hideDelay}
        id={id}
        place={place}
      >
        {content}
      </StyledTooltip>
    )}
  </>
)
