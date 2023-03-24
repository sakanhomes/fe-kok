import ReactSelect from 'react-select'
import styled from 'styled-components'
import { ISelectProps } from './types'

export const StyledSelect = styled(ReactSelect)<ISelectProps>`
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  z-index: 2;
  ${({ isDisabled }) => isDisabled && 'opacity: 0.5;'}
  .Select__control {
    border-radius: 5px;
    height: 42px;
    border-color: ${({ theme, error }) =>
      error ? theme.palette.danger200 : theme.palette.primary400};
    transition: 300ms;
    :hover,
    :focus {
      filter: brightness(0.95);
      border: 1px solid
        ${({ error, theme: { palette } }) =>
          error ? palette.danger200 : palette.primary100};
    }
  }

  .Select__menu-list {
  }

  .Select__control:hover {
  }

  .Select__control--is-focused {
  }

  .Select__indicator-separator {
  }

  .Select__menu {
  }
  .Select__option--is-focused {
  }
  .Select__option {
  }
  .Select__placeholder {
  }
  .Select__value-container {
  }
  .Select__single-value {
  }
  .Select__input-container {
  }
  .Select__indicator {
  }
`
