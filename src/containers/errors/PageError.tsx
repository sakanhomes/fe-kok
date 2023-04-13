import React, { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ERROR_STATUS } from '@/constants/error-status'
import { ROUTES } from '@/constants/routes'
import { useRouter } from 'next/router'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/components/Box'
import { actions } from './store/index'

type TErrorPageProps = {
  status: number | null
}

export const ErrorPage: FC<TErrorPageProps> = ({ status }) => {
  const { t } = useTranslation('error')
  const { dispatch } = useRedux()
  const { push } = useRouter()

  const handleHome = () => {
    dispatch(actions.setPageError(null))
    push(ROUTES.HOME)
  }

  if (!status) return null

  return (
    <div>
      <h2>{status}</h2>
      <Box mb={20}>{t(String(status))}</Box>
      {status !== ERROR_STATUS.SERVER && (
        <button onClick={handleHome} type="button">
          {t('common:home')}
        </button>
      )}
    </div>
  )
}
