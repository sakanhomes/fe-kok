import { profileApi } from '@/api/rest/profile'
import { useRedux } from '@/hooks/use-redux'
import { TFormik } from '@/types/formik'
import { THistory } from '@/types/history'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useEffect, useState } from 'react'

export const useHistory = (): {
  history: THistory | null
  setHistory: (search?: string) => void
} => {
  const [history, setHistory] = useState<THistory | null>(null)
  const { dispatch } = useRedux()

  const getHistoryAsync = async (search?: string, formik?: TFormik) => {
    try {
      const { data } = search
        ? await profileApi.getHistory({ search })
        : await profileApi.getHistory()
      setHistory(data.data.views)
      formik?.resetForm()
    } catch (e) {
      handleActionErrors({ e, dispatch, formik })
    } finally {
      formik?.setSubmitting(false)
    }
  }

  useEffect(() => {
    getHistoryAsync()
  }, [])

  const setSyncHistory = (search?: string, formik?: TFormik) => {
    getHistoryAsync(search, formik)
  }

  return { history, setHistory: setSyncHistory }
}
