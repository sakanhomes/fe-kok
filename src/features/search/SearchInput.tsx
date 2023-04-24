import { SearchIcon } from '@/components/icons/SearchIcon'
import { FormikInput } from '@/components/inputs/FormikInput'
import { ROUTES } from '@/constants/routes'
import { useFormik } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { BaseButton } from '@/components/buttons/BaseButton'
import Box from '@/components/Box'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { validation } from '@/utils/validation'
import * as yup from 'yup'

export const SearchInput: FC = () => {
  const router = useRouter()
  const { t } = useTranslation('inputs')
  const formik = useFormik({
    initialValues: {
      value: '',
    },
    validationSchema: yup.object().shape({ value: validation.minWidth(2, t) }),
    onSubmit: ({ value }) => {
      if (value) router.push({ pathname: ROUTES.SEARCH, query: { value } })
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box position="relative">
        <FormikInput
          placeholder={t('searchVideo')}
          name="value"
          formik={formik}
          style={{ paddingRight: 60 }}
          additionalContent={
            formik.values.value.length > 0
              ? {
                  place: 'append',
                  el: (
                    <Box opacity={0.9}>
                      <BaseButton onClick={() => formik.resetForm()}>
                        <CloseIcon color="danger100" />
                      </BaseButton>
                    </Box>
                  ),
                }
              : undefined
          }
          iconButton={
            <BaseButton type="submit">
              <SearchIcon color="primary400" />
            </BaseButton>
          }
        />
      </Box>
    </form>
  )
}
