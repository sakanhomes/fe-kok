import React, { FC } from 'react'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const ProfileIcon: FC<TIcon> = (props) => (
  <SVG
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    type="stroke"
    {...props}
  >
    <path
      d="M8.5 1C4.35775 1 1 4.35775 1 8.5C1 12.6422 4.35775 16 8.5 16C12.6422 16 16 12.6422 16 8.5C16 4.35775 12.6422 1 8.5 1Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.70312 13.2595C2.70312 13.2595 4.37488 11.125 8.49988 11.125C12.6249 11.125 14.2974 13.2595 14.2974 13.2595M8.49988 8.5C9.09661 8.5 9.66891 8.26295 10.0909 7.84099C10.5128 7.41903 10.7499 6.84674 10.7499 6.25C10.7499 5.65326 10.5128 5.08097 10.0909 4.65901C9.66891 4.23705 9.09661 4 8.49988 4C7.90314 4 7.33084 4.23705 6.90888 4.65901C6.48693 5.08097 6.24988 5.65326 6.24988 6.25C6.24988 6.84674 6.48693 7.41903 6.90888 7.84099C7.33084 8.26295 7.90314 8.5 8.49988 8.5V8.5Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVG>
)
