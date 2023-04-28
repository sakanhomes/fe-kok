import Box from '@/components/Box'
import { BaseButton } from '@/components/buttons/BaseButton'
import { TButton } from '@/components/buttons/types'
import { FormikInput } from '@/components/inputs/FormikInput'
import { Modal, TModalBase } from '@/components/modals/Modal'
import { Text } from '@/components/Text'
import { validation } from '@/utils/validation'
import { useFormik } from 'formik'
import Trans from 'next-translate/Trans'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import styled from 'styled-components'
import * as yup from 'yup'

const Button = styled(BaseButton)`
  height: 37px;
  font-size: 18px;
  justify-content: center;
  border-radius: 10px;
  font-weight: 400;
  width: fit-content;
  padding: 0 25px;
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

const Title = styled(Box)`
  text-align: start;
`

export const DeleteVideoConfirmation: FC<{
  modal: TModalBase
  cancel: { title?: string } & TButton
  confirm: { title: string; onClick: () => void } & TButton
  onClose?: () => void
}> = ({ modal, cancel, confirm: { onClick, ...confirm }, onClose }) => {
  const { t } = useTranslation('creator-center')

  const formik = useFormik({
    initialValues: {
      deleteInput: '',
    },
    validationSchema: yup
      .object()
      .shape({ deleteInput: validation.equalTo('delete', t) }),
    onSubmit: () => onClick?.(),
  })

  return (
    <Modal maxWidth="500px" onClose={onClose} padding="30px 44px" {...modal}>
      <form onSubmit={formik.handleSubmit}>
        <ModalTitle tag="div" variant="p2">
          <Title display="grid" gridGap="10px">
            <Trans
              i18nKey="creator-center:deleteTitleConfirmation"
              components={[<Text key={0} />]}
            />
          </Title>
        </ModalTitle>
        <Box marginBottom={35} marginTop={25}>
          <FormikInput formik={formik} name="deleteInput" placeholder="Enter 'Delete'" />
        </Box>
        <Box display="flex" justifyContent="center" gridGap={25}>
          <ConfirmButton {...confirm} type="submit">
            {confirm.title}
          </ConfirmButton>
          <CancelButton {...cancel} type="button">
            {cancel.title ?? t('common:cancel')}
          </CancelButton>
        </Box>
      </form>
    </Modal>
  )
}
