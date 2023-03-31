import { BaseButton } from '@/components/buttons/BaseButton'
import { UploadIcon2 } from '@/components/icons/UploadIcon2'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Videos } from './containers/Videos'
import { creatorCenterSelector, getVideosAsync } from './store/creatorCenter'

const UploadButton = styled(BaseButton)`
  color: ${({ theme }) => theme.palette.secondary100};
  background-color: ${({ theme }) => theme.palette.secondary200};
  height: 47px;
  padding: 0 13px;
  border-radius: 10px;
  margin-bottom: 82px;
`

export const CreatorCenterVideos: FC<{
  uploadVideo: (args: {
    open: boolean
    onClose: () => void
    onSuccess?: () => void
  }) => void
}> = ({ uploadVideo }) => {
  const [openUpload, setOpenUpload] = useState(false)
  const { dispatch } = useRedux()
  const { select } = useRedux()
  const { activeTab } = select(creatorCenterSelector)
  const { t } = useTranslation('creator-center')
  const [uploadSucces, setUploadSuccess] = useState(false)
  const openUploadToogle = () => setOpenUpload(!openUpload)

  useEffect(() => {
    if (activeTab === 'videos') dispatch(getVideosAsync(() => setUploadSuccess(false)))
  }, [uploadSucces])

  if (activeTab !== 'videos') return <></>

  return (
    <Box>
      <UploadButton
        onClick={openUploadToogle}
        icon={{ el: <UploadIcon2 color="secondary100" />, place: 'prepend' }}
      >
        {t('uploadVideo')}
      </UploadButton>
      {openUpload &&
        uploadVideo({
          open: openUpload,
          onSuccess: () => setUploadSuccess(true),
          onClose: () => {
            setOpenUpload(false)
          },
        })}
      <Videos />
    </Box>
  )
}
