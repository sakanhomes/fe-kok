import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from '@/routes'
import { useAuth } from '@/hooks/use-auth'

export const PermissionAuth: FC = ({ children }) => {
  const { user } = useAuth()
  const { replace } = useRouter()

  useEffect(() => {
    if (user) {
      replace(ROUTES.HOME)
    }
  })

  return <>{!user && children}</>
}
