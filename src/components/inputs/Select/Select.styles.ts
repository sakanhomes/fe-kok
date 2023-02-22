import ReactSelect from 'react-select'
import styled from 'styled-components'
import { ISelectProps } from './types'

export const StyledSelect = styled(ReactSelect)<ISelectProps>`
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  z-index: 2;
  ${({ isDisabled }) => isDisabled && 'opacity: 0.5;'}
  .Select__control {
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
