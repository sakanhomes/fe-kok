import React, { FC } from 'react'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const CloseIcon: FC<TIcon & { size?: string }> = ({ size, ...props }) => (
  <SVG
    width={size ?? '14'}
    height={size ?? '14'}
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
    type="fill"
    {...props}
  >
    <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" />
  </SVG>
)
