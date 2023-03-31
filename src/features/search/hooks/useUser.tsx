import { usersApi } from '@/api/rest/users'
import { useRedux } from '@/hooks/use-redux'
import { TShortUserInfo } from '@/types/common'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useUser = (): {
  users: TShortUserInfo[]
  fetching: boolean
  getUsers: () => void
} => {
  const [users, setUsers] = useState<TShortUserInfo[]>([])
  const [fetching, setFetching] = useState(true)
  const { dispatch } = useRedux()
  const { query } = useRouter()
  const [mouted, setMounted] = useState(false)

  const getUserAsync = async (search: string) => {
    setFetching(true)
    try {
      const { data } = await usersApi.get({ search })
      setUsers(data.data.users)
    } catch (e) {
      handleActionErrors({ e, dispatch })
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    if (!mouted) setMounted(true)
    if (typeof query.value === 'string' && mouted) getUserAsync(query.value)
  }, [query])

  const getUsers = () => {
    if (typeof query.value === 'string') getUserAsync(query.value)
  }

  return { users, fetching, getUsers }
}
