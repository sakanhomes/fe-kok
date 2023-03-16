import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

export const Tooltip = styled(ReactTooltip)`
  &.type-light {
    background-color: ${({ theme }) => theme.palette.secondary100};
    color: ${({ theme }) => theme.palette.primary100};
    padding: 10px;
    opacity: 1;
    border-radius: 8px;
    max-width: 40%;
    position: fixed;

    &:after,
    &::before {
      display: none;
    }
  }
`
