import styled from 'styled-components'

export const Wrapper = styled.div<{ open: boolean }>`
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.25);
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  transition: 0.3s;
  padding: ${({ open }) => (open ? ' 0 10px 40px 15px' : '0 0 40px')};
  min-width: ${({ open }) => (open ? '225px' : '115px')};
  max-width: ${({ open }) => (open ? '225px' : '115px')};
`

export const StyledLogo = styled.div<{ open: boolean }>`
  position: relative;
  transform: translateX(-50%);
  left: ${({ open }) => (open ? 50 : 45)}%;
  transition: 0.3s;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  svg {
    min-width: 133px;
  }
`
