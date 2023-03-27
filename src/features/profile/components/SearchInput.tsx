import { SearchIcon } from '@/components/icons/SearchIcon'
import { FormikInput } from '@/components/inputs/FormikInput'
import { useFormik } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { BaseButton } from '@/components/buttons/BaseButton'
import Box from '@/styles/Box'
import { TFormik } from '@/types/formik'

export const SearchInput: FC<{ onSubmit: (value: string, formik?: TFormik) => void }> = ({
  onSubmit,
}) => {
  const { t } = useTranslation('inputs')

  const formik = useFormik({
    initialValues: {
      value: '',
    },
    onSubmit: ({ value }) => {
      onSubmit(value, formik)
    },
  })

  return (
    <Box maxWidth={494} margin="0 auto" as="form" onSubmit={formik.handleSubmit}>
      <FormikInput
        placeholder={t('searchVideo')}
        name="value"
        formik={formik}
        iconButton={
          <BaseButton isLoading={formik.isSubmitting} type="submit">
            <SearchIcon color="primary400" />
          </BaseButton>
        }
      />
    </Box>
  )
}
