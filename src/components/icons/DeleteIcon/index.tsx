import React, { FC } from 'react'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const DeleteIcon: FC<TIcon> = (props) => (
  <SVG
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    type="fill"
    {...props}
  >
    <path d="M9 8H10.5V17H9V8ZM13.5 8H15V17H13.5V8Z" />
    <path d="M3 4.33398V5.83398H4.5V20.834C4.5 21.2318 4.65804 21.6133 4.93934 21.8946C5.22064 22.1759 5.60218 22.334 6 22.334H18C18.3978 22.334 18.7794 22.1759 19.0607 21.8946C19.342 21.6133 19.5 21.2318 19.5 20.834V5.83398H21V4.33398H3ZM6 20.834V5.83398H18V20.834H6ZM9 1.33398H15V2.83398H9V1.33398Z" />
  </SVG>
)
