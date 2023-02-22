import React, { FC } from 'react'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const SideExpandIcon: FC<TIcon & { isOpen: boolean }> = ({ isOpen, ...props }) => (
  <SVG
    width={isOpen ? '32' : '24'}
    height="18"
    viewBox={isOpen ? '0 0 32 14' : '0 0 24 18'}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    type="stroke"
    {...props}
  >
    {!isOpen && (
      <>
        <path d="M2 3H22" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <path d="M2 9H22" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <path d="M2 15H22" stroke="black" strokeWidth="2" strokeLinecap="round" />
      </>
    )}

    {isOpen && (
      <>
        <path d="M1 1H21" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 7H26" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 13H31" stroke="black" strokeWidth="2" strokeLinecap="round" />
      </>
    )}
  </SVG>
)
