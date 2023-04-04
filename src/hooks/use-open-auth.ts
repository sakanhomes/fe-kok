import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAuth } from './use-auth'

export const useOpenAuth = (): (() => void) | null => {
  const { user, address } = useAuth()
  const { openConnectModal } = useConnectModal()

  const openAuth = () => {
    if (!user && !address && openConnectModal) {
      openConnectModal()
    }
  }

  if (user && address) return null

  return openAuth
}
