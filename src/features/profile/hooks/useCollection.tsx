import { profileApi } from '@/api/rest/profile'
import { useRedux } from '@/hooks/use-redux'
import { TFormik } from '@/types/formik'
import { TOwnerPlaylist } from '@/types/playlists'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useState } from 'react'

export const useCollection = (
  collectionData: TOwnerPlaylist
): {
  collection: TOwnerPlaylist
  setCollection: (search?: string, formik?: TFormik) => void
} => {
  const [collection, setCollection] = useState<TOwnerPlaylist>(collectionData)
  const { dispatch } = useRedux()

  const getCollectionAsync = async (search?: string, formik?: TFormik) => {
    try {
      const { data } = search
        ? await profileApi.getCollection(collection.id, { search })
        : await profileApi.getCollection(collection.id)
      setCollection(data.data.playlist)
      formik?.resetForm()
    } catch (e) {
      handleActionErrors({ e, dispatch })
    } finally {
      formik?.setSubmitting(false)
    }
  }

  const setSyncCollection = (search?: string, formik?: TFormik) => {
    getCollectionAsync(search, formik)
  }

  return { collection, setCollection: setSyncCollection }
}
