import { IPalette } from '@/styles/styled'
import { ButtonHTMLAttributes, ReactNode } from 'react'

export type TButton = {
  icon?: {
    el: ReactNode
    place?: 'append' | 'prepend'
  }
  color?: keyof IPalette
  bg?: keyof IPalette
  isLoading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>
