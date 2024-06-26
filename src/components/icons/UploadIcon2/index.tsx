import React, { FC } from 'react'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const UploadIcon2: FC<TIcon & { size?: string }> = ({ size, ...props }) => (
  <SVG
    width={size ?? '18'}
    height={size ?? '18'}
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    type="fill"
    {...props}
  >
    <path d="M30.625 20.4167V27.7083C30.625 28.4819 30.3177 29.2237 29.7707 29.7707C29.2237 30.3177 28.4819 30.625 27.7083 30.625H7.29167C6.51812 30.625 5.77625 30.3177 5.22927 29.7707C4.68229 29.2237 4.375 28.4819 4.375 27.7083V7.29167C4.375 6.51812 4.68229 5.77625 5.22927 5.22927C5.77625 4.68229 6.51812 4.375 7.29167 4.375H14.5833V7.29167H7.29167V27.7083H27.7083V20.4167H30.625Z" />
    <path d="M30.6253 10.2083H24.792V4.375H21.8753V10.2083H16.042V13.125H21.8753V18.9583H24.792V13.125H30.6253V10.2083Z" />
  </SVG>
)
