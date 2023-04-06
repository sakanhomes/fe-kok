import { BaseButton } from '@/components/buttons/BaseButton'
import { NOTIFICATIONS_QUERY } from '@/constants/router'
import Box from '@/styles/Box'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { Notifications } from './containers/Notifications'
import { Profile } from './containers/Profile'

const ActionsWrapper = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.secondary200};
  width: fit-content;
  margin-left: auto;
  padding: 0 30px;
  height: 40px;
`

const Action = styled(BaseButton)<{ $active: boolean }>`
  height: 100%;
  padding: 0 10px;
  ${({ $active, theme }) =>
    $active && `border-bottom: 3px solid ${theme.palette.accent300};`}
  transform: translateY(2px);
`

export const Settings: FC = () => {
  const { query } = useRouter()
  const [activeTab, setActiveTab] = useState<'settings' | 'notification'>(
    query.tab === NOTIFICATIONS_QUERY ? 'notification' : 'settings'
  )
  const { t } = useTranslation('settings')

  return (
    <Box marginTop={40}>
      <ActionsWrapper display="flex" gridGap={40}>
        <Action
          $active={activeTab === 'settings'}
          onClick={() => setActiveTab('settings')}
        >
          {t('profileSettings')}
        </Action>
        <Action
          $active={activeTab === 'notification'}
          onClick={() => setActiveTab('notification')}
        >
          {t('notification')}
        </Action>
      </ActionsWrapper>
      {activeTab === 'settings' && <Profile />}
      {activeTab === 'notification' && <Notifications />}
    </Box>
  )
}
