import { profileApi } from '@/api/rest/profile'
import { useRedux } from '@/hooks/use-redux'
import { TShortUserInfo } from '@/types/common'
import { TFormik } from '@/types/formik'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useEffect, useState } from 'react'

export const useSubscribers = (): {
  subscribers: TShortUserInfo[]
  setSubscribers: (search?: string) => void
} => {
  const [subscribers, setSubscribers] = useState<TShortUserInfo[]>([])
  const { dispatch } = useRedux()

  const getSubscribersAsync = async (search?: string, formik?: TFormik) => {
    try {
      const { data } = search
        ? await profileApi.getSubscribers({ search })
        : await profileApi.getSubscribers()
      setSubscribers(data.data.users)
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

  const setSyncSubscribers = (search?: string, formik?: TFormik) => {
    getSubscribersAsync(search, formik)
  }

  return { subscribers, setSubscribers: setSyncSubscribers }
}
