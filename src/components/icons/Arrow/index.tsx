import React, { FC } from 'react'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const Arrow: FC<TIcon> = (props) => (
  <SVG
    width="29"
    height="14"
    viewBox="0 0 29 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    type="stroke"
    {...props}
  >
    <svg>
      <path d="M0.980077 1.30117L14.49 12.7012L28 1.30117" />
    </svg>
  </SVG>
)
