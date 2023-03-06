import React, { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import styled from 'styled-components'
import { Modal } from '@/components/modals/Modal'
import { useRedux } from '@/hooks/use-redux'
import { Text } from '@/components/Text'
import { rgba } from 'emotion-rgba'
import { commingSoonSelector, setCommingSoon } from './store'

const StyledModal = styled(Modal)`
  background-color: ${({ theme }) => rgba(theme.palette.primary400, 0.5)};
  color: ${({ theme }) => theme.palette.secondary100};
  padding: 36px 14px;
`

export const CommingSoon: FC = () => {
  const { t } = useTranslation('common')
  const { select, dispatch } = useRedux()
  const { isCommingSoon } = select(commingSoonSelector)

  const onClose = () => dispatch(setCommingSoon(false))
  return (
    <StyledModal
      open={isCommingSoon}
      withCloseButton={false}
      maxWidth="fit-content"
      onClose={onClose}
    >
      <Text color="secondary100" fontWeight={700} variant="h1">
        {t('commingSoon')}
      </Text>
    </StyledModal>
  )
}
