import React, { FC } from 'react'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const TreasuryIcon: FC<TIcon> = (props) => (
  <SVG
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    type="stroke"
    {...props}
  >
    <svg>
      <path
        d="M3 16.75V13.4142M9.66667 16.75V13.4142M16.3333 16.75V13.4142M23 16.75V13.4142M1 21H25V25H1V21ZM1 9V6.33333L12.5068 1L25 6.33333V9H1Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </SVG>
)
