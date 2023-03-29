import { usersApi } from '@/api/rest/users'
import { useRedux } from '@/hooks/use-redux'
import { TShortUserInfo } from '@/types/common'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useState } from 'react'

export const useUser = (): {
  user: TShortUserInfo | null
  setUser: (address: string) => void
} => {
  const [user, setUser] = useState<TShortUserInfo | null>(null)
  const { dispatch } = useRedux()

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

  return { user, setUser: setUserSync }
}
