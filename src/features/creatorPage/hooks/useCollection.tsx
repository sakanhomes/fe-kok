import { usersApi } from '@/api/rest/users'
import { useRedux } from '@/hooks/use-redux'
import { TOwnerPlaylist } from '@/types/playlists'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useCollection = (): {
  collection: TOwnerPlaylist['videos']
  setCollection: (address: string) => void
} => {
  const [collection, setCollection] = useState<TOwnerPlaylist['videos']>([])
  const { dispatch } = useRedux()
  const { query } = useRouter()

  const getCollectionAsync = async (address: string) => {
    try {
      const { data } = await usersApi.getCollection('default', address)
      setCollection(data.data.playlist.videos)
    } catch (e) {
      handleActionErrors({ e, dispatch })
    }
  }

  const setCollectionSync = (address: string) => {
    getCollectionAsync(address)
  }

  useEffect(() => {
    if (typeof query.id === 'string') setCollectionSync(query.id)
  }, [query])

  return { collection, setCollection: setCollectionSync }
}
