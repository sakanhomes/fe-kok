import { SearchIcon } from '@/components/icons/SearchIcon'
import { FormikInput } from '@/components/inputs/FormikInput'
import { ROUTES } from '@/constants/routes'
import { useFormik } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { BaseButton } from '@/components/buttons/BaseButton'

export const SearchInput: FC = () => {
  const router = useRouter()
  const { t } = useTranslation('inputs')
  const formik = useFormik({
    initialValues: {
      value: '',
    },
    onSubmit: ({ value }) => {
      if (value) router.push({ pathname: ROUTES.SEARCH, query: { value } })
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormikInput
        placeholder={t('searchVideo')}
        name="value"
        formik={formik}
        iconButton={
          <BaseButton type="submit">
            <SearchIcon color="primary400" />
          </BaseButton>
        }
      />
    </form>
  )
}
