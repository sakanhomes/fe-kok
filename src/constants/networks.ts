import { INetworkPalette } from '@/styles/styled'

export const NETWORKS: { [key in 'ETH' | 'BNB' | 'POLYGON']: keyof INetworkPalette } = {
  ETH: 'eth',
  BNB: 'bnb',
  POLYGON: 'polygon',
} as const
