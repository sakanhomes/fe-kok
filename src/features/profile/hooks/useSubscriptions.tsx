import { profileApi } from '@/api/rest/profile'
import { useRedux } from '@/hooks/use-redux'
import { TShortUserInfo } from '@/types/common'
import { TFormik } from '@/types/formik'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useEffect, useState } from 'react'

export const useSubscriptions = (): {
  subscriptions: TShortUserInfo[]
  setSubscriptions: (search?: string) => void
} => {
  const [subscriptions, setSubscriptions] = useState<TShortUserInfo[]>([])
  const { dispatch } = useRedux()

  const getSubscribersAsync = async (search?: string, formik?: TFormik) => {
    try {
      const { data } = search
        ? await profileApi.getSubscriptions({ search })
        : await profileApi.getSubscriptions()
      setSubscriptions(data.data.users)
      formik?.resetForm()
    } catch (e) {
      handleActionErrors({ e, dispatch })
    } finally {
      formik?.setSubmitting(false)
    }
  }

  useEffect(() => {
    getSubscribersAsync()
  }, [])

  const setSyncSubscriptions = (search?: string, formik?: TFormik) => {
    getSubscribersAsync(search, formik)
  }

  return { subscriptions, setSubscriptions: setSyncSubscriptions }
}
