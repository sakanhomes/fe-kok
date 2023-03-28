import { profileApi } from '@/api/rest/profile'
import { useRedux } from '@/hooks/use-redux'
import { TOwnerPlaylist } from '@/types/playlists'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useEffect, useState } from 'react'

export const useCollections = (): TOwnerPlaylist[] => {
  const [collections, setCollections] = useState<TOwnerPlaylist[]>([])
  const { dispatch } = useRedux()

  const getCollectionsAsync = async () => {
    try {
      const { data } = await profileApi.getCollections()
      setCollections(data.data.playlists)
    } catch (e) {
      handleActionErrors({ e, dispatch })
    }
  }

  useEffect(() => {
    getCollectionsAsync()
  }, [])

  return collections
}
