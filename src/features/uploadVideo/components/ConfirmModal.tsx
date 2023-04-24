import Box from '@/components/Box'
import { BaseButton } from '@/components/buttons/BaseButton'
import { TButton } from '@/components/buttons/types'
import { Modal, TModalBase } from '@/components/modals/Modal'
import { Text } from '@/components/Text'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'

const Button = styled(BaseButton)`
  height: 56px;
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
const ConfirmButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.secondary200};
`

const ModalTitle = styled(Text)`
  text-align: center;
`

export const ConfirmModal: FC<{
  modal: TModalBase
  title: string | ReactNode
  cancel: { title?: string } & TButton
  confirm: { title: string } & TButton
  onClose?: () => void
}> = ({ modal, title, cancel, confirm, onClose }) => {
  const { t } = useTranslation('common')
  return (
    <Modal maxWidth="509px" onClose={onClose} padding="36px" {...modal}>
      <ModalTitle tag="div" variant="h5">
        {title}
      </ModalTitle>
      <Box marginTop={56} paddingX={48} display="flex" justifyContent="space-between">
        <CancelButton {...cancel}>{cancel.title ?? t('common:cancel')}</CancelButton>
        <ConfirmButton {...confirm}>{confirm.title}</ConfirmButton>
      </Box>
    </Modal>
  )
}
