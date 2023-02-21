import React, { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Modal } from '@/components/modals/Modal'
import Box from '@/styles/Box'

type TModalMessageProps = {
  buttonLabel?: string
  onClose: () => void
  onClickButton?: () => void
  title?: string
  description?: string | React.ReactNode
  status?: 'success' | 'error'
  open: boolean
  actions?: React.ReactNode | React.ReactNode[]
}

export const ModalMessage: FC<TModalMessageProps> = ({
  title,
  description,
  status = 'success',
  buttonLabel,
  onClose,
  onClickButton = onClose,
  open,
  children,
  actions,
}) => {
  const { t } = useTranslation('common')

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title || (status === 'success' ? t('success') : t('error'))}
    >
      <Box mb={30}>
        {description && typeof description === 'string' ? (
          <Box>{description}</Box>
        ) : (
          description
        )}
        {children}
      </Box>
      {actions ||
        (onClickButton ? (
          <button type="button" onClick={onClickButton}>
            {buttonLabel || t('close')}
          </button>
        ) : null)}
    </Modal>
  )
}
