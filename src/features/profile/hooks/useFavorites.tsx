import { profileApi } from '@/api/rest/profile'
import { useRedux } from '@/hooks/use-redux'
import { TFormik } from '@/types/formik'
import { TOwnerVideo } from '@/types/video'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useEffect, useState } from 'react'

export const useFavorites = (): {
  favorites: TOwnerVideo[]
  setFavorites: (search?: string) => void
} => {
  const [favorites, setFavorites] = useState<TOwnerVideo[]>([])
  const { dispatch } = useRedux()

  const getFavoritesAsync = async (search?: string, formik?: TFormik) => {
    try {
      const { data } = search
        ? await profileApi.getFavourites({ search })
        : await profileApi.getFavourites()
      setFavorites(data.data.videos)
      formik?.resetForm()
    } catch (e) {
      handleActionErrors({ e, dispatch })
    } finally {
      formik?.setSubmitting(false)
    }
  }

  useEffect(() => {
    getFavoritesAsync()
  }, [])

  const setSyncFavorites = (search?: string, formik?: TFormik) => {
    getFavoritesAsync(search, formik)
  }

  return { favorites, setFavorites: setSyncFavorites }
}
