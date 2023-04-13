import Box from '@/components/Box'
import styled, { css } from 'styled-components'
import { Text } from '@/components/Text'

export const StyledText = styled(Text)<{ isOpen: boolean }>(({ isOpen }) => {
  const openStyle = css`
    max-width: 0;
  `
  const closeStyle = css`
    max-width: 115px;
  `
  return css`
    transition: 300ms;
    text-align: center;
    ${isOpen ? openStyle : closeStyle}
  `
})

export const MenuText = styled(Text)`
  overflow: hidden;
  transition: 300ms;
`

export const ItemBox = styled(Box)<{ isOpen: boolean; active: boolean }>(
  ({ isOpen, active, theme }) => {
    const openStyle = css`
      ${MenuText} {
        max-width: 200px;
      }
    `
    const closeStyle = css`
      margin-left: 44px;
      ${MenuText} {
        max-width: 0;
      }
    `
    return css`
      cursor: pointer;
      transition: 300ms;
      svg {
        ${active && `filter: drop-shadow(3px 5px 2px ${theme.palette.accent300});`};
      }
      ${isOpen ? openStyle : closeStyle}
      span {
        white-space: nowrap;
      }
    `
  }
)
