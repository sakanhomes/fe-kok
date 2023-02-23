import { ButtonHTMLAttributes, ReactNode } from 'react'

export type TButton = {
  icon?: {
    el: ReactNode
    place?: 'append' | 'prepend'
  }
} & ButtonHTMLAttributes<HTMLButtonElement>
