import React, { FC } from 'react'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const SendArrow: FC<TIcon> = (props) => (
  <SVG
    width="15"
    height="24"
    viewBox="0 0 15 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    type="fill"
    {...props}
  >
    <path d="M6.375 22.0898C6.375 22.7802 6.93464 23.3398 7.625 23.3398C8.31536 23.3398 8.875 22.7802 8.875 22.0898H6.375ZM7.625 0.911198L0.408122 13.4112H14.8419L7.625 0.911198ZM8.875 22.0898V12.1612H6.375L6.375 22.0898H8.875Z" />
  </SVG>
)
