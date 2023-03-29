import React, { FC } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { UserInfo } from '@/components/UserInfo'

export const ProfileHeader: FC = () => {
  const { user } = useAuth()

  return user ? <UserInfo user={user} /> : <></>
}
