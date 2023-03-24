import React, { FC } from 'react'
import { Modal } from '@/components/modals/Modal'

import { UploadFiles } from '@/components/UploadFiles'
import 'react-circular-progressbar/dist/styles.css'
import { useRedux } from '@/hooks/use-redux'
import styled from 'styled-components'
import { BaseButton } from '@/components/buttons/BaseButton'
import { Text } from '@/components/Text'
import Box from '@/styles/Box'
import useTranslation from 'next-translate/useTranslation'
import { UploadVideoForm } from './containers/UploadVideoFrom'
import {
  resetUpload,
  setVideoClosed,
  setVideoData,
  uploadVideoAsync,
  uploadVideoSelector,
} from './store/uploadVideo'
import { SuccessModal } from './components/SuccessModal'

const Button = styled(BaseButton)`
  height: 36px;
  font-size: 24px;
  justify-content: center;
  border-radius: 10px;
  color: ${({ theme }) => theme.palette.primary100};
  font-weight: 400;
  width: fit-content;
  padding: 0 16px;
`

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.accent300};
`
const CloseButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.secondary200};
`

const ModalTitle = styled(Text)`
  text-align: center;
`

export const UploadModal: FC<{ onClose: () => void; open: boolean }> = ({
  open,
  onClose,
}) => {
  const { dispatch, select } = useRedux()
  const { videoData, closeType, step, video } = select(uploadVideoSelector)
  const { t } = useTranslation('upload')
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

  return (
    <Modal
      open={open}
      padding={madalPaddings()}
      maxWidth="fit-content"
      onClose={() => {
        if (step === 'form') dispatch(setVideoClosed('close'))
        else onClose()
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
        <Modal maxWidth="509px" open={!!closeType} padding="36px">
          <ModalTitle variant="h5">{t('closeTitle')}</ModalTitle>
          <Box marginTop={56} paddingX={48} display="flex" justifyContent="space-between">
            <CancelButton
              onClick={() => {
                dispatch(setVideoClosed(null))
              }}
            >
              {t('common:cancel')}
            </CancelButton>
            <CloseButton
              onClick={() => {
                if (closeType === 'back') {
                  dispatch(resetUpload())
                }
                if (closeType === 'close') {
                  onClose()
                  dispatch(resetUpload())
                }
              }}
            >
              {t('common:close')}
            </CloseButton>
          </Box>
        </Modal>
      )}
    </Modal>
  )
}
