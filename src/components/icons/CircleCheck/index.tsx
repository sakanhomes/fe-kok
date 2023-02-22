import React, { FC } from 'react'
import { useTheme } from 'styled-components'
import { SVG } from '../SVG'
import { TIcon } from '../type'

type TSizes = '45' | '24' | '16' | '10'

export const CircleCheck: FC<TIcon & { size?: TSizes; fill?: TIcon['color'] }> = ({
  size = '24',
  fill,
  ...props
}) => {
  const theme = useTheme()
  return (
    <SVG
      width={size}
      height={size}
      viewBox="0 0 45 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      type="stroke"
      {...props}
    >
      <rect
        x="1.5"
        y="2.16602"
        width="42"
        height="42"
        rx="21"
        fill={fill ? theme.palette[fill] : theme.palette.secondary100}
        strokeWidth="3"
      />
      <path
        d="M17.3595 24.0897L21.337 28.0672L29.2919 20.1122"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  )
}
