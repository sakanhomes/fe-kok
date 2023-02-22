import React, { FC } from 'react'
import { useTheme } from 'styled-components'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const CheckIcon: FC<TIcon & { checked: boolean }> = ({ checked, ...props }) => {
  const { color } = props
  const theme = useTheme()
  return (
    <SVG
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {checked && (
        <path
          d="M9 11L12 14L22 4"
          stroke={theme.palette.success200}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      <path
        d="M21.24 12.12V19.2133C21.24 19.7508 21.0265 20.2663 20.6464 20.6464C20.2663 21.0265 19.7508 21.24 19.2133 21.24H5.02667C4.48916 21.24 3.97367 21.0265 3.5936 20.6464C3.21352 20.2663 3 19.7508 3 19.2133V5.02667C3 4.48916 3.21352 3.97367 3.5936 3.5936C3.97367 3.21352 4.48916 3 5.02667 3H16.1733"
        stroke={color ? theme.palette[color] : theme.palette.primary400}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  )
}
