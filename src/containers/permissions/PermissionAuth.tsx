import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from '@/routes'
import { useAuth } from '@/hooks/use-auth'
import { useConnectModal } from '@rainbow-me/rainbowkit'

export const PermissionsAuth: FC = ({ children }) => {
  const { replace } = useRouter()
  const { user } = useAuth()
  const { openConnectModal } = useConnectModal()

  useEffect(() => {
    if (!user) {
      if (openConnectModal) openConnectModal()
      replace(ROUTES.HOME)
    }
  })

  return <>{user && children}</>
}
