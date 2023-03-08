import { BaseButton } from '@/components/buttons/BaseButton'
import { FormikInput } from '@/components/inputs/FormikInput'
import { Text } from '@/components/Text'
import { useAuth } from '@/hooks/use-auth'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import { validation } from '@/utils/validation'
import { useFormik } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import * as yup from 'yup'
import {
  resetSettings,
  setProfileAsync,
  setProfileData,
  settingsSelector,
} from '../../store/settings'

const ActionsWrapper = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary500};
`

const Button = styled(BaseButton)<{ variant: 'main' | 'secondary' }>(
  ({ variant, theme }) => {
    const baseStyles = css`
      padding: 0 10px;
      height: 40px;
      border-radius: 8px;
      min-width: 84px;
      justify-content: center;
    `
    const mainStyles = css`
      color: ${theme.palette.secondary100};
      background-color: ${theme.palette.accent300};
    `
    const secondaryStyles = css`
      color: ${theme.palette.primary100};
      background-color: ${theme.palette.secondary100};
      border: 1px solid ${theme.palette.accent300};
    `
    return css`
      ${baseStyles}
      ${variant === 'main' && mainStyles}
      ${variant === 'secondary' && secondaryStyles}
    `
  }
)

const Form = styled.form`
  display: grid;
  gap: 32px;
`

export const BaseInfo: FC = () => {
  const { select, dispatch } = useRedux()
  const { profileData } = select(settingsSelector)
  const { user } = useAuth()
  const { t } = useTranslation('settings')

  const formik = useFormik({
    initialValues: {
      name: profileData?.name ?? '',
      description: profileData?.description ?? '',
    },
    validationSchema: yup.object().shape({
      name: validation.required,
      description: validation.required,
    }),
    onSubmit: (formData) => {
      dispatch(setProfileAsync({ formData, formik }))
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <ActionsWrapper
        height={64}
        alignItems="center"
        display="flex"
        justifyContent="space-between"
      >
        <Text>{t('basicInfo')}</Text>
        <Box display="flex" gridGap={39}>
          <Button
            variant="secondary"
            onClick={() => {
              dispatch(resetSettings())
              dispatch(setProfileData(user))
              formik.resetForm()
            }}
          >
            {t('cancel')}
          </Button>
          <Button
            variant="main"
            disabled={formik.isSubmitting || !formik.dirty}
            type="submit"
          >
            {t('save')}
          </Button>
        </Box>
      </ActionsWrapper>
      <FormikInput name="name" label={{ label: 'Username' }} formik={formik} />
      <FormikInput
        name="description"
        label={{ label: 'About Me', style: { fontSize: 17, fontWeight: 500 } }}
        formik={formik}
        textarea
      />
    </Form>
  )
}
