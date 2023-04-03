import React, { FC } from 'react'
import { useTheme } from 'styled-components'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const LikeIcon2: FC<TIcon> = ({ color, ...props }) => {
  const { palette } = useTheme()
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 19.1431C15.0495 19.1431 19.1429 15.0497 19.1429 10.0003C19.1429 4.95082 15.0495 0.857422 10 0.857422C4.95057 0.857422 0.857178 4.95082 0.857178 10.0003C0.857178 15.0497 4.95057 19.1431 10 19.1431Z"
        stroke={palette[color ?? 'primary100']}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.14292 8.28571C7.7741 8.28571 8.28578 7.77404 8.28578 7.14286C8.28578 6.51167 7.7741 6 7.14292 6C6.51174 6 6.00006 6.51167 6.00006 7.14286C6.00006 7.77404 6.51174 8.28571 7.14292 8.28571Z"
        fill={palette[color ?? 'primary100']}
      />
      <path
        d="M12.8572 8.28571C13.4883 8.28571 14 7.77404 14 7.14286C14 6.51167 13.4883 6 12.8572 6C12.226 6 11.7143 6.51167 11.7143 7.14286C11.7143 7.77404 12.226 8.28571 12.8572 8.28571Z"
        fill={palette[color ?? 'primary100']}
      />
      <path
        d="M6.57147 11.1426C7.26062 12.666 8.40347 13.4283 10 13.4283C11.5966 13.4283 12.7395 12.666 13.4286 11.1426"
        stroke={palette[color ?? 'primary100']}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  )
}
