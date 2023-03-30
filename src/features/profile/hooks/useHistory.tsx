import { profileApi } from '@/api/rest/profile'
import { useRedux } from '@/hooks/use-redux'
import { TFormik } from '@/types/formik'
import { THistory } from '@/types/history'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useEffect, useState } from 'react'

export const useHistory = (): {
  history: THistory | null
  fetching: boolean
  setHistory: (search?: string) => void
} => {
  const [history, setHistory] = useState<THistory | null>(null)
  const [fetching, setFetching] = useState(true)
  const { dispatch } = useRedux()

  const getHistoryAsync = async (search?: string, formik?: TFormik) => {
    setFetching(true)
    try {
      const { data } = search
        ? await profileApi.getHistory({ search })
        : await profileApi.getHistory()
      setHistory(data.data.views)
      formik?.resetForm()
    } catch (e) {
      handleActionErrors({ e, dispatch, formik })
    } finally {
      setFetching(false)
      formik?.setSubmitting(false)
    }
  }

  useEffect(() => {
    getHistoryAsync()
  }, [])

  const setSyncHistory = (search?: string, formik?: TFormik) => {
    getHistoryAsync(search, formik)
  }

  return { history, fetching, setHistory: setSyncHistory }
}
