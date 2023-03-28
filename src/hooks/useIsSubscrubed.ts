import { usersApi } from '@/api/rest/users'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useEffect, useState } from 'react'
import { useAuth } from './use-auth'
import { useRedux } from './use-redux'

export const useIsSubscribed = (): boolean => {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { dispatch } = useRedux()
  const { user } = useAuth()

  const getFlugsAsync = async () => {
    if (!user) return
    try {
      const { data } = await usersApi.getFlags(user.address)
      setIsSubscribed(data.data.flags.isSubscribed)
    } catch (e) {
      handleActionErrors({ e, dispatch })
    }
  }
  useEffect(() => {
    getFlugsAsync()
  }, [user?.address])

  return isSubscribed
}
