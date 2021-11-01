import { ReactNode } from 'react'
import { SpaceProps } from 'styled-system'

export const variants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  TEXT: 'text',
  TEXTDISABLED: 'textDisabled',
  TEXTSUBTLE: 'textSubtle',
  BINANCE: 'binance',
  FAILURE: 'failure',
  WARNING: 'warning',
} as const

export const scales = {
  MD: 'md',
  SM: 'sm',
  XS: 'xs',
  XXS: 'xxs',
  XXXS: 'xxxs',
} as const

export type Scale = typeof scales[keyof typeof scales]
export type Variant = typeof variants[keyof typeof variants]

export interface TagProps extends SpaceProps {
  variant?: Variant
  scale?: Scale
  startIcon?: ReactNode
  endIcon?: ReactNode
  outline?: boolean
}
