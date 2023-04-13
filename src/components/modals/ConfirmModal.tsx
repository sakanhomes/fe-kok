import Box from '@/components/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import styled from 'styled-components'
import { BaseButton } from '../buttons/BaseButton'
import { TButton } from '../buttons/types'
import { Text } from '../Text'
import { Modal, TModalBase } from './Modal'

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
const ConfirmButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.secondary200};
`

const ModalTitle = styled(Text)`
  text-align: center;
`

export const ConfirmModal: FC<{
  modal: TModalBase
  title: string
  cancel: { title?: string } & TButton
  confirm: { title: string } & TButton
}> = ({ modal, title, cancel, confirm }) => {
  const { t } = useTranslation('common')
  return (
    <Modal maxWidth="509px" padding="36px" {...modal}>
      <ModalTitle variant="h5">{title}</ModalTitle>
      <Box marginTop={56} paddingX={48} display="flex" justifyContent="space-between">
        <CancelButton {...cancel}>{cancel.title ?? t('common:cancel')}</CancelButton>
        <ConfirmButton {...confirm}>{confirm.title}</ConfirmButton>
      </Box>
    </Modal>
  )
}
