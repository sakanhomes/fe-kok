import { profileApi } from '@/api/rest/profile'
import { BaseButton } from '@/components/buttons/BaseButton'
import { CollectIcon } from '@/components/icons/CollectIcon'
import { useAuth } from '@/hooks/use-auth'
import { useRedux } from '@/hooks/use-redux'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import React, { FC, useEffect, useState } from 'react'

export const CollectButton: FC<{ id: string }> = ({ id }) => {
  const { user, address } = useAuth()
  const [collectionVideoIds, setCollectionVideoIds] = useState<string[]>([])
  const { dispatch } = useRedux()
  const { openConnectModal } = useConnectModal()

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
    if (address && user) getCollectionsAsync()
  }, [address, user])

  const onCollectClick = () => {
    if (!address && !user && openConnectModal) {
      openConnectModal()
    } else if (collectionVideoIds.includes(id)) {
      removeFromCollectionAsync()
    } else {
      addToCollectionAsync()
    }
  }

  return (
    <BaseButton disabled={!collectionVideoIds} onClick={onCollectClick}>
      <CollectIcon color={collectionVideoIds.includes(id) ? 'danger100' : 'accent300'} />
    </BaseButton>
  )
}
