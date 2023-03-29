import React, { FC, useEffect } from 'react'
import { UserInfo } from '@/components/UserInfo'
import { useRouter } from 'next/router'
import { useUser } from './hooks/useUser'

export const CreatorHeader: FC = () => {
  const { query } = useRouter()
  const { user, setUser } = useUser()

  useEffect(() => {
    if (typeof query.id === 'string') setUser(query.id)
  }, [query])

  return <>{user && <UserInfo user={user} followButton />}</>
}
