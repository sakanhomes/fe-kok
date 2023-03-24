import React, { FC } from 'react'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const File: FC<TIcon> = (props) => (
  <SVG
    width="80"
    height="72"
    viewBox="0 0 80 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    type="fill"
    {...props}
  >
    <path d="M80 64C80 66.1217 79.1571 68.1566 77.6569 69.6569C76.1566 71.1571 74.1217 72 72 72H8C5.87827 72 3.84344 71.1571 2.34315 69.6569C0.842854 68.1566 0 66.1217 0 64V8C0 5.87827 0.842854 3.84344 2.34315 2.34315C3.84344 0.842854 5.87827 0 8 0H28L36 12H72C74.1217 12 76.1566 12.8429 77.6569 14.3431C79.1571 15.8434 80 17.8783 80 20V64Z" />
  </SVG>
)
