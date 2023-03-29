import React, { FC } from 'react'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const PlayArrow: FC<TIcon> = (props) => (
  <SVG
    width="14"
    height="16"
    viewBox="0 0 14 16"
    xmlns="http://www.w3.org/2000/svg"
    type="fill"
    {...props}
  >
    <path d="M0.794639 15.2227L0.41964 0.283719L13.9196 8.07795L0.794639 15.2227Z" />
  </SVG>
)
