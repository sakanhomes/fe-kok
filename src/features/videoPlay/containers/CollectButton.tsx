import { profileApi } from '@/api/rest/profile'
import { BaseButton } from '@/components/buttons/BaseButton'
import { CollectIcon } from '@/components/icons/CollectIcon'
import { ConnectWallet } from '@/containers/ConnectWallet'
import { useOpenAuth } from '@/hooks/use-open-auth'
import { useRedux } from '@/hooks/use-redux'
import { handleActionErrors } from '@/utils/handleActionErrors'
import React, { FC, useEffect, useState } from 'react'

export const CollectButton: FC<{ id: string }> = ({ id }) => {
  const [collectionVideoIds, setCollectionVideoIds] = useState<string[]>([])
  const { dispatch } = useRedux()
  const openAuth = useOpenAuth()

  const getCollectionsAsync = async () => {
    try {
      const { data } = await profileApi.getCollections()
      const collectionId = data.data.playlists.find((item) => item.isDefault)?.id
      if (collectionId) {
        const { data } = await profileApi.getCollection(collectionId)
        const videosId = data.data.playlist.videos.map((item) => item.id)
        if (videosId) setCollectionVideoIds(videosId)
      }
    } catch (e) {
      handleActionErrors({ e, dispatch })
    }
  }

  const addToCollectionAsync = async () => {
    try {
      await profileApi.addToCollection('default', id)
      getCollectionsAsync()
    } catch (e) {
      handleActionErrors({ e, dispatch })
    }
  }

  const removeFromCollectionAsync = async () => {
    try {
      await profileApi.removeFromCollection('default', id)
      getCollectionsAsync()
    } catch (e) {
      handleActionErrors({ e, dispatch })
    }
  }

  useEffect(() => {
    if (!openAuth) getCollectionsAsync()
  }, [openAuth])

  const onCollectClick = () => {
    if (collectionVideoIds.includes(id)) removeFromCollectionAsync()
    else addToCollectionAsync()
  }

  return (
    <ConnectWallet
      onClick={onCollectClick}
      target={(onClick) => (
        <BaseButton disabled={!collectionVideoIds} onClick={onClick}>
          <CollectIcon
            color={collectionVideoIds.includes(id) ? 'danger100' : 'accent300'}
          />
        </BaseButton>
      )}
    />
  )
}
