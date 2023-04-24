import React, { FC, useEffect } from 'react'
import { Modal } from '@/components/modals/Modal'

import { UploadFiles } from '@/components/UploadFiles'
import 'react-circular-progressbar/dist/styles.css'
import { useRedux } from '@/hooks/use-redux'
import useTranslation from 'next-translate/useTranslation'
import { cancelTokenSource, resetCancelToken } from '@/api/rest/instance'
import { UploadVideoForm } from './containers/UploadVideoFrom'
import {
  abortAsync,
  resetUpload,
  setVideoClosed,
  setVideoData,
  uploadVideoAsync,
  uploadVideoSelector,
} from './store/uploadVideo'
import { SuccessModal } from './components/SuccessModal'
import { ConfirmModal } from './components/ConfirmModal'

export const UploadModal: FC<{
  onClose: () => void
  onSuccess?: () => void
  open: boolean
}> = ({ open, onClose, onSuccess }) => {
  const { dispatch, select } = useRedux()
  const { videoData, closeType, step, video, uploads, uploadVideoComplete } =
    select(uploadVideoSelector)
  const { t } = useTranslation('upload')

  useEffect(() => {
    if (step === 'success') onSuccess?.()
  }, [step])

  const madalPaddings = (): string | undefined => {
    switch (step) {
      case 'drop':
        return '61px 77px'
      case 'form':
        return '0'
      case 'success':
        return '24px 20px'
      default:
        return undefined
    }
  }

  const onCloseHandler = () => {
    onClose()
    if (uploads && !uploadVideoComplete) {
      dispatch(
        abortAsync(uploads?.id, () => {
          cancelTokenSource.cancel()
          resetCancelToken()
        })
      )
    } else if (uploadVideoComplete) {
      dispatch(resetUpload())
    }
  }

  return (
    <Modal
      open={open}
      padding={madalPaddings()}
      maxWidth="fit-content"
      onClose={() => {
        if (step === 'form') dispatch(setVideoClosed('close'))
        else onCloseHandler()
      }}
    >
      {step === 'drop' && (
        <UploadFiles
          type="video"
          onDropAccepted={(file) => {
            const formData = new FormData()
            formData.append('file', file, file.name)
            dispatch(
              setVideoData({
                name: file.name,
                size: file.size,
                localLink: URL.createObjectURL(file),
              })
            )
            dispatch(uploadVideoAsync(file))
          }}
        />
      )}
      {step === 'form' && videoData && <UploadVideoForm videoData={videoData} />}
      {step === 'success' && video && <SuccessModal {...video} />}
      {closeType && (
        <ConfirmModal
          modal={{ open: !!closeType }}
          title={t('closeTitle')}
          confirm={{
            onClick: () => {
              if (closeType === 'back') {
                if (uploads && !uploadVideoComplete) {
                  dispatch(
                    abortAsync(uploads?.id, () => {
                      cancelTokenSource.cancel()
                      resetCancelToken()
                    })
                  )
                } else if (uploadVideoComplete) {
                  dispatch(resetUpload())
                }
              }
              if (closeType === 'close') {
                onCloseHandler()
              }
            },
            title: t('common:close'),
          }}
          cancel={{
            onClick: () => {
              dispatch(setVideoClosed(null))
            },
          }}
        />
      )}
    </Modal>
  )
}
