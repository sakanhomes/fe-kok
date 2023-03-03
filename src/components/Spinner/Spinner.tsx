import { IPalette } from '@/styles/styled'
import React, { FC } from 'react'
import styled from 'styled-components'

const StyledSpinner = styled.svg<{ size?: number; color?: keyof IPalette }>`
  animation: rotate 2s linear infinite;
  width: ${({ size }) => (size ? `${size}px` : '100px')};
  height: ${({ size }) => (size ? `${size}px` : '100px')};

  & .path {
    stroke: ${({ theme, color }) => theme.palette[color ?? 'accent200']};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`
export const Spinner: FC<{
  size?: number
  className?: string
  color?: keyof IPalette
}> = ({ size, className, color }) => (
  <StyledSpinner size={size} color={color} className={className} viewBox="0 0 50 50">
    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
  </StyledSpinner>
)
