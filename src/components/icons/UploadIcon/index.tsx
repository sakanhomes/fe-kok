import React, { FC } from 'react'
import { SVG } from '../SVG'
import { TIcon } from '../type'

export const UploadIcon: FC<TIcon> = (props) => (
  <SVG
    width="28"
    height="22"
    viewBox="0 0 28 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    type="stroke"
    {...props}
  >
    <path
      d="M5.17857 15.8984C2.87081 15.8984 1 14.4701 1 12.3759C1 10.2817 2.87081 8.58394 5.17857 8.58394C5.3355 8.58394 5.49042 8.59179 5.64286 8.60708V8.58394H5.70033C5.6624 8.30789 5.64286 8.02665 5.64286 7.74128C5.64286 4.01817 8.96874 1 13.0714 1C15.8497 1 18.2717 2.38402 19.5459 4.43373C19.8573 4.39217 20.1759 4.37064 20.5 4.37064C24.0898 4.37064 27 7.01154 27 10.2693C27 12.951 25.028 14.9953 22.3281 15.6691M13.7948 21V11.3226M13.7948 11.3226L9.53125 15.3137M13.7948 11.3226L18.0625 15.3137"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVG>
)
