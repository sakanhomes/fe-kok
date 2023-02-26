import React, { FC } from 'react'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const SearchIcon: FC<TIcon> = (props) => (
  <SVG
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    type="stroke"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.55113 14.6023C11.1692 14.6023 14.1023 11.6692 14.1023 8.05113C14.1023 4.43304 11.1692 1.5 7.55113 1.5C3.93304 1.5 1 4.43304 1 8.05113C1 11.6692 3.93304 14.6023 7.55113 14.6023Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.625 13.1255L16.7427 17.2431"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVG>
)
