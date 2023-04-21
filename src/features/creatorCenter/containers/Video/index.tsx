import { videosApi } from '@/api/rest/videos'
import { BaseButton } from '@/components/buttons/BaseButton'
import { DeleteIcon } from '@/components/icons/DeleteIcon'
import { EyeIcon } from '@/components/icons/EyeIcon'
import { ConfirmModal } from '@/components/modals/ConfirmModal'
import { VideoCard } from '@/components/VideoCard'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/components/Box'
import { TOwnerVideo } from '@/types/video'
import { handleActionErrors } from '@/utils/handleActionErrors'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useState } from 'react'

export const Video: FC<{ video: TOwnerVideo }> = ({ video }) => {
  const [newVideo, setNewVideo] = useState(video)
  const [isUpdating, setIsUpdating] = useState(false)
  const [deletingStatus, setDeletingStatus] = useState<'deleting' | 'deleted' | null>(
    null
  )
  const { t } = useTranslation('creator-center')
  const { dispatch } = useRedux()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const updateVideo = async () => {
    try {
      setIsUpdating(true)
      const { data } = await videosApi.updateVideo(newVideo.id, {
        isPublic: !newVideo.isPublic,
      })
      setNewVideo(data.data.video)
    } catch (e) {
      handleActionErrors({ e, dispatch })
    } finally {
      setIsUpdating(false)
    }
  }

  const deleteVideo = async () => {
    try {
      setDeletingStatus('deleting')
      await videosApi.deleteVideo(newVideo.id)
      setDeletingStatus('deleted')
    } catch (e) {
      handleActionErrors({ e, dispatch })
      setDeletingStatus(null)
    }
  }

  if (deletingStatus === 'deleted') return <></>

  return (
    <VideoCard
      uniqId="owner_video"
      {...newVideo}
      showUser={false}
      additionalContent={
        <Box
          marginTop={10}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <BaseButton
            icon={{
              el: <EyeIcon isOpen={newVideo.isPublic} color="primary500" />,
              place: 'prepend',
            }}
            onClick={updateVideo}
            isLoading={isUpdating}
          >
            {newVideo.isPublic ? t('public') : t('private')}
          </BaseButton>
          <BaseButton
            onClick={() => setOpenDeleteModal(true)}
            isLoading={deletingStatus === 'deleting'}
          >
            <DeleteIcon color="primary100" />
          </BaseButton>
          <ConfirmModal
            modal={{ open: openDeleteModal }}
            onClose={() => setOpenDeleteModal(false)}
            title={
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gridGap="10px"
              >
                <DeleteIcon color="primary300" /> {t('deleteTitle')}
              </Box>
            }
            confirm={{
              onClick: deleteVideo,
              title: t('common:delete'),
              isLoading: deletingStatus === 'deleting',
            }}
            cancel={{
              onClick: () => setOpenDeleteModal(false),
            }}
          />
        </Box>
      }
    />
  )
}
