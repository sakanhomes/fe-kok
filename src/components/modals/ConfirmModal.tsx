import Box from '@/components/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { BaseButton } from '../buttons/BaseButton'
import { TButton } from '../buttons/types'
import { Text } from '../Text'
import { Modal, TModalBase } from './Modal'

const Button = styled(BaseButton)`
  height: 37px;
  font-size: 18px;
  justify-content: center;
  border-radius: 10px;
  font-weight: 400;
  width: fit-content;
  padding: 0 5px;
`

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.secondary200};
  color: ${({ theme }) => theme.palette.primary100};
`
const ConfirmButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.accent300};
  color: ${({ theme }) => theme.palette.secondary100};
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
    <Modal maxWidth="296px" onClose={onClose} padding="30px 44px" {...modal}>
      <ModalTitle tag="div" variant="p2">
        {title}
      </ModalTitle>
      <Box marginTop={35} display="flex" justifyContent="center" gridGap={25}>
        <ConfirmButton {...confirm}>{confirm.title}</ConfirmButton>
        <CancelButton {...cancel}>{cancel.title ?? t('common:cancel')}</CancelButton>
      </Box>
    </Modal>
  )
}
