/* eslint-disable no-nested-ternary */
import { SIDEBAR_CLOSE_WIDTH, SIDEBAR_OPEN_WIDTH } from '@/constants/leyout'
import Box from '@/components/Box'
import styled from 'styled-components'
import { BaseButton } from '@/components/buttons/BaseButton'

export const Wrapper = styled.div<{ open: boolean; hasBurger?: boolean }>`
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  transition: 0.3s;
  padding: ${({ open }) => (open ? ' 0 15px 40px' : '0 0 40px')};
  min-width: ${({ open, hasBurger }) =>
    open ? SIDEBAR_OPEN_WIDTH : hasBurger ? 0 : SIDEBAR_CLOSE_WIDTH};
  max-width: ${({ open, hasBurger }) =>
    open ? SIDEBAR_OPEN_WIDTH : hasBurger ? 0 : SIDEBAR_CLOSE_WIDTH};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 11;
  background-color: ${({ theme }) => theme.palette.secondary100};
`

export const StyledLogo = styled.div`
  position: relative;
  transform: translateX(-50%);
  left: 50%;
  transition: 0.3s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-top: 15px;
`

export const AdditionalBox = styled(Box)<{ isOpen: boolean }>`
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: 300ms;
`

export const BurgerButton = styled(BaseButton)<{ isOpen?: boolean }>`
  width: ${({ isOpen }) => (isOpen ? 'fit-content' : '67px')};
  justify-content: center;
  height: fit-content;
`
