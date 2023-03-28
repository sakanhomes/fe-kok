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
  const [collectionId, setCollectionId] = useState<string>()
  const [collectionVideoIds, setCollectionVideoIds] = useState<string[]>([])
  const { dispatch } = useRedux()
  const { openConnectModal } = useConnectModal()

  const getCollectionsAsync = async () => {
    try {
      const { data } = await profileApi.getCollections()
      const videosId = data.data.playlists
        .find((item) => item.isDefault)
        ?.videos.map((item) => item.id)
      if (videosId) setCollectionVideoIds(videosId)
      setCollectionId(data.data.playlists.find((item) => item.isDefault)?.id)
    } catch (e) {
      handleActionErrors({ e, dispatch })
    }
  }

  const addToCollectionAsync = async () => {
    try {
      if (!collectionId) return
      await profileApi.addToCollection('default', id)
      getCollectionsAsync()
    } catch (e) {
      handleActionErrors({ e, dispatch })
    }
  }

  const removeFromCollectionAsync = async () => {
    try {
      if (!collectionId) return
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
    <BaseButton disabled={!collectionId} onClick={onCollectClick}>
      <CollectIcon color={collectionVideoIds.includes(id) ? 'danger100' : 'accent300'} />
    </BaseButton>
  )
}