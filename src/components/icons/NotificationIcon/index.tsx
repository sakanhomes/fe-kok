import React, { FC } from 'react'
import { useTheme } from 'styled-components'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const NotificationIcon: FC<TIcon & { hasNotification?: boolean }> = ({
  hasNotification,
  ...props
}) => {
  const theme = useTheme()
  return (
    <SVG
      width="23"
      height="25"
      viewBox="0 0 23 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      type="stroke"
      {...props}
    >
      <path
        d="M7.66667 22.0899C8.55126 22.7599 9.71941 23.1673 11 23.1673C12.2806 23.1673 13.4487 22.7599 14.3333 22.0899M1.63454 18.642C1.10753 18.642 0.813175 17.857 1.13197 17.4209C1.8717 16.4088 2.58569 14.9245 2.58569 13.1371L2.6162 10.5471C2.6162 5.73496 6.36976 1.83398 11 1.83398C15.6984 1.83398 19.5073 5.79243 19.5073 10.6754L19.4768 13.1371C19.4768 14.9368 20.1661 16.4292 20.8758 17.4417C21.1823 17.8789 20.8872 18.642 20.3667 18.642H1.63454Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {hasNotification && (
        <circle cx="18" cy="6.83398" r="5" stroke="none" fill={theme.palette.danger200} />
      )}
    </SVG>
  )
}
