import React, { FC } from 'react'
import { Modal } from '@/components/modals/Modal'
import { Text } from '@/components/Text'

export const UploadModal: FC<{ onClose: () => void; open: boolean }> = ({
  open,
  onClose,
}) => (
  <Modal open={open} maxWidth="fit-content" onClose={onClose}>
    <Text fontWeight={700} variant="h1">
      Upload Modal
    </Text>
  </Modal>
)
