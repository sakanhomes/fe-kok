import { rgba } from 'emotion-rgba'
import PopupComponent from 'reactjs-popup'
import styled, { CSSProperties } from 'styled-components'
import { BaseButton } from '../buttons/BaseButton'

export const Popup = styled(PopupComponent)`
  &-overlay {
    overflow-y: auto;
    height: var(--window-height);
    overscroll-behavior: none;
    top: 0 !important;
    background-color: ${({ theme }) => rgba(theme.palette.primary100, 0.4)};
    pointer-events: none;
  }
  &-content {
    width: 100%;
    padding: 16px;
  }
`

export const Close = styled(BaseButton)`
  position: absolute;
  top: 20px;
  right: 20px;
`

export const Container = styled.div<{
  maxWidth?: CSSProperties['maxWidth']
  padding: CSSProperties['padding']
}>`
  max-width: ${({ maxWidth }) =>
    typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth};
  background-color: ${({ theme }) => theme.palette.secondary100};
  border-radius: 10px;
  padding: ${({ padding }) => padding ?? '20px 60px'};
  margin: 0 auto;
  position: relative;
`

export const CloseButton = styled(BaseButton)`
  padding: 10px 20px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.secondary200};
`
