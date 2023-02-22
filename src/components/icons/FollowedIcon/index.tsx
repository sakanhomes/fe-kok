import React, { FC } from 'react'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const FollowedIcon: FC<TIcon> = (props) => (
  <SVG
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    type="stroke"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.55113 15.1023C12.1692 15.1023 15.1023 12.1692 15.1023 8.55113C15.1023 4.93304 12.1692 2 8.55113 2C4.93304 2 2 4.93304 2 8.55113C2 12.1692 4.93304 15.1023 8.55113 15.1023Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.625 13.6255L17.7427 17.7431"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVG>
)
