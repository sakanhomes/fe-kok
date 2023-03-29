import React, { FC } from 'react'
import { UserInfo } from '@/components/UserInfo'
import { useAuth } from '@/hooks/use-auth'
import { useUser } from './hooks/useUser'

export const CreatorHeader: FC = () => {
  const { user } = useUser()
  const auth = useAuth()

  return (
    <>
      {user && (
        <UserInfo user={user} followButton={user.address !== auth.user?.address} />
      )}
    </>
  )
}
