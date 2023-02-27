import styled from 'styled-components'
import { Logo } from '@/components/icons/Logo'

export const Wrapper = styled.div<{ open: boolean }>`
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${({ open }) => (open ? ' 0 10px 40px 15px' : '0 0 40px')};
`

export const StyledLogo = styled(Logo)<{ open: boolean }>`
  position: relative;
  transform: translateX(-50%);
  left: ${({ open }) => (open ? 50 : 45)}%;
  transition: 0.3s;
  cursor: pointer;
`