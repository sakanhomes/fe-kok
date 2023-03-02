import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from '@/routes'
import { useAuth } from '@/hooks/use-auth'

export const PermissionsAuth: FC = ({ children }) => {
  const { replace } = useRouter()
  const { user, userFetching } = useAuth()

  useEffect(() => {
    if (userFetching) return
    if (!user) {
      replace(ROUTES.HOME)
    }
  })

  return <>{user && children}</>
}
