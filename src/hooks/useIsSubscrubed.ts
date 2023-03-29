import { usersApi } from '@/api/rest/users'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useEffect, useState } from 'react'
import { useRedux } from './use-redux'

export const useIsSubscribed = (address?: string): boolean | undefined => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>()
  const { dispatch } = useRedux()

  const getFlugsAsync = async () => {
    try {
      if (!address) return
      const { data } = await usersApi.getFlags(address)
      setIsSubscribed(data.data.flags.isSubscribed)
    } catch (e) {
      handleActionErrors({ e, dispatch })
    }
  }

  useEffect(() => {
    getFlugsAsync()
  }, [address])

  return isSubscribed
}
