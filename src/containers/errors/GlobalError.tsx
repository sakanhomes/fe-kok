import { ModalMessage } from '@/components/modals/ModalMessage'
import useTranslation from 'next-translate/useTranslation'
import { useRedux } from '@/hooks/use-redux'
import { actions, selectors } from './store'

export const GlobalError: React.FC = () => {
  const { t } = useTranslation('error')
  const { select, dispatch } = useRedux()
  const { globalError } = select(selectors.errors)

  const { message, hasError } = globalError

  const onClose = () => {
    dispatch(actions.hideGlobalError())
  }

  if (!hasError) return null

  const description =
    typeof message === 'string' && message !== '' ? message : t('default-message')

  return (
    <ModalMessage
      open={hasError}
      onClickButton={onClose}
      description={description}
      onClose={onClose}
      status="error"
    />
  )
}
