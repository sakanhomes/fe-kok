import { usersApi } from '@/api/rest/users'
import { useRedux } from '@/hooks/use-redux'
import { TShortUserInfo } from '@/types/common'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useUser = (): {
  user: TShortUserInfo | null
  setUser: (address: string) => void
} => {
  const [user, setUser] = useState<TShortUserInfo | null>(null)
  const { dispatch } = useRedux()
  const { query } = useRouter()

  const getUserAsync = async (address: string) => {
    try {
      const { data } = await usersApi.getByAddress(address)
      setUser(data.data.user)
    } catch (e) {
      handleActionErrors({ e, dispatch })
    }
  }

  const setUserSync = (address: string) => {
    getUserAsync(address)
  }

  useEffect(() => {
    if (typeof query.id === 'string') setUserSync(query.id)
  }, [query])

  return { user, setUser: setUserSync }
}
