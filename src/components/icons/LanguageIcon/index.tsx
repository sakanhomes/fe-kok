import React, { FC } from 'react'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const LanguageIcon: FC<TIcon> = (props) => (
  <SVG
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    type="stroke"
    {...props}
  >
    <path d="M22.3002 11.9992C22.3002 17.6878 17.6887 22.2992 12.0002 22.2992C6.31166 22.2992 1.7002 17.6878 1.7002 11.9992C1.7002 6.31069 6.31166 1.69922 12.0002 1.69922C17.6887 1.69922 22.3002 6.31069 22.3002 11.9992Z" />
  </SVG>
)
