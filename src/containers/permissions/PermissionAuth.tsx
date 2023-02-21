import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from '@/routes'
import { useAuth } from '@/hooks/use-auth'

export const PermissionAuth: FC = ({ children }) => {
  const { user, userFetching } = useAuth()
  const { replace } = useRouter()

  useEffect(() => {
    if (userFetching) return
    if (user) {
      replace(ROUTES.HOME)
    }
  })

  return <>{!user && children}</>
}
