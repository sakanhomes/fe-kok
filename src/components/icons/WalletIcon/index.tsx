import React, { FC } from 'react'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const WalletIcon: FC<TIcon & { width?: string; height?: string }> = (props) => (
  <SVG
    width="28"
    height="20"
    viewBox="0 0 28 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    type="stroke"
    {...props}
  >
    <path
      d="M25.111 13.4499V17C25.111 18.1046 24.2156 19 23.111 19H3.00055C1.89601 19 1.00059 18.1046 1.00055 17.0001L1.00007 3.00007C1.00003 1.89547 1.89547 1 3.00007 1H23.111C24.2156 1 25.111 1.89543 25.111 3V6.46365M26.38 13.4499H22.2559C20.3286 13.4499 18.7662 11.9724 18.7662 10.1499C18.7662 8.32731 20.3286 6.84985 22.2559 6.84985H26.38V13.4499Z"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </SVG>
)
