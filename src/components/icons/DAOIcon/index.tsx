import React, { FC } from 'react'
import { useTheme } from 'styled-components'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const FanTokenIcon: FC<TIcon> = (props) => {
  const theme = useTheme()
  const { color } = props

  return (
    <SVG
      width="26"
      height="24"
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      type="stroke"
      {...props}
    >
      <circle cx="13" cy="6" r="4.5" strokeLinecap="round" />
      <path d="M16.9689 5.25C17.433 4.44611 18.1975 3.85951 19.0941 3.61926C19.9908 3.37901 20.9461 3.50478 21.75 3.96891C22.5539 4.43304 23.1405 5.19751 23.3807 6.09413C23.621 6.99076 23.4952 7.94611 23.0311 8.75C22.567 9.55389 21.8025 10.1405 20.9059 10.3807C20.0092 10.621 19.0539 10.4952 18.25 10.0311C17.4461 9.56696 16.8595 8.80249 16.6193 7.90587C16.379 7.00924 16.5048 6.0539 16.9689 5.25L16.9689 5.25Z" />
      <path d="M2.96891 5.25C3.43304 4.44611 4.19751 3.85951 5.09413 3.61926C5.99076 3.37901 6.94611 3.50478 7.75 3.96891C8.55389 4.43304 9.14049 5.19751 9.38074 6.09413C9.62099 6.99076 9.49522 7.94611 9.03109 8.75C8.56696 9.55389 7.80249 10.1405 6.90587 10.3807C6.00924 10.621 5.05389 10.4952 4.25 10.0311C3.44611 9.56696 2.85951 8.80249 2.61926 7.90587C2.37901 7.00924 2.50478 6.0539 2.96891 5.25L2.96891 5.25Z" />
      <path
        d="M19.635 21.3997L19.1421 21.484L19.2132 21.8997H19.635V21.3997ZM25.0307 20.3092L24.5443 20.4252L25.0307 20.3092ZM16.7793 16.1367L16.4461 15.7639L15.9857 16.1754L16.484 16.5401L16.7793 16.1367ZM24.1206 20.8997H19.635V21.8997H24.1206V20.8997ZM24.5443 20.4252C24.5982 20.6511 24.4316 20.8997 24.1206 20.8997V21.8997C24.9978 21.8997 25.7388 21.1231 25.5171 20.1933L24.5443 20.4252ZM19.7955 15.5C21.3544 15.5 22.418 16.2622 23.1642 17.2674C23.9217 18.2879 24.3333 19.54 24.5443 20.4252L25.5171 20.1933C25.2925 19.2513 24.8411 17.8488 23.9672 16.6714C23.082 15.4789 21.7458 14.5 19.7955 14.5V15.5ZM17.1125 16.5094C17.7845 15.9087 18.6517 15.5 19.7955 15.5V14.5C18.3843 14.5 17.2846 15.0143 16.4461 15.7639L17.1125 16.5094ZM16.484 16.5401C18.203 17.7985 18.8815 19.9611 19.1421 21.484L20.1278 21.3154C19.8553 19.7228 19.1177 17.2287 17.0746 15.7332L16.484 16.5401Z"
        fill={theme.palette[color ?? 'primary100']}
      />
      <path
        d="M9.22074 16.1368L9.51608 16.5402L10.0143 16.1755L9.55399 15.764L9.22074 16.1368ZM0.969163 20.3092L0.482794 20.1933H0.482794L0.969163 20.3092ZM6.36523 21.3997V21.8997H6.78694L6.85807 21.484L6.36523 21.3997ZM6.20438 15.5C7.34827 15.5 8.21555 15.9088 8.88748 16.5095L9.55399 15.764C8.71545 15.0143 7.61571 14.5 6.20438 14.5V15.5ZM1.45553 20.4252C1.66655 19.54 2.07818 18.2879 2.83567 17.2674C3.58187 16.2622 4.64551 15.5 6.20438 15.5V14.5C4.2541 14.5 2.91793 15.4789 2.03271 16.6714C1.15878 17.8488 0.70737 19.2513 0.482794 20.1933L1.45553 20.4252ZM1.87926 20.8997C1.5683 20.8997 1.40167 20.6511 1.45553 20.4252L0.482794 20.1933C0.261123 21.1231 1.00209 21.8997 1.87926 21.8997V20.8997ZM6.36523 20.8997H1.87926V21.8997H6.36523V20.8997ZM6.85807 21.484C7.11864 19.9611 7.79715 17.7986 9.51608 16.5402L8.92539 15.7333C6.88245 17.2289 6.14488 19.7228 5.87239 21.3154L6.85807 21.484Z"
        fill={theme.palette[color ?? 'primary100']}
      />
      <path
        d="M13.0012 15C18.2981 15 19.4666 19.8594 19.7244 22.0034C19.7903 22.5518 19.3497 22.9996 18.7974 22.9996H7.20508C6.65279 22.9996 6.21211 22.5518 6.27804 22.0034C6.53582 19.8594 7.70434 15 13.0012 15Z"
        strokeLinecap="round"
      />
    </SVG>
  )
}
