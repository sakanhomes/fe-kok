import React, { FC } from 'react'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const ReplyIcon: FC<TIcon> = (props) => (
  <SVG
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    type="stroke"
    {...props}
  >
    <g clipPath="url(#clip0_2367_13105_reply)">
      <path
        d="M4.20599 9.39403L9.48599 4.55353C10.4482 3.67153 12 4.35403 12 5.65903V8.24953C21.75 8.24953 20.25 20.2495 20.25 20.2495C20.25 20.2495 17.25 12.7495 12 12.7495V15.3393C12 16.6443 10.4482 17.3268 9.48674 16.4455L4.20674 11.605C4.05352 11.4645 3.93118 11.2937 3.84749 11.1034C3.7638 10.9131 3.72058 10.7074 3.72058 10.4995C3.72058 10.2916 3.7638 10.086 3.84749 9.89569C3.93118 9.70538 4.05352 9.53455 4.20674 9.39403H4.20599Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2367_13105_reply">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </SVG>
)
