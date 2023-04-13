import { notificationsApi } from '@/api/rest/notifications'
import { BaseButton } from '@/components/buttons/BaseButton'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { NotificationIcon } from '@/components/icons/NotificationIcon'
import { SettingsIcon } from '@/components/icons/SettingsIcon'
import { Modal } from '@/components/modals/Modal'
import { Text } from '@/components/Text'
import { NOTIFICATIONS_QUERY } from '@/constants/router'
import { ROUTES } from '@/constants/routes'
import { useOpenAuth } from '@/hooks/use-open-auth'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/components/Box'
import { TNotification } from '@/types/notification'
import { handleActionErrors } from '@/utils/handleActionErrors'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { ConnectWallet } from '@/containers/ConnectWallet'
import { Notification } from './components/Notification'

export const Notifications: FC = () => {
  const openAuth = useOpenAuth()
  const { dispatch } = useRedux()
  const [notifications, setNotifications] = useState<TNotification[]>([])
  const [openModal, setOpenModal] = useState(false)
  const { push } = useRouter()
  const { t } = useTranslation('notifications')

  const getNotificationsAsync = async () => {
    try {
      const { data } = await notificationsApi.get({ limit: 3 })
      setNotifications(data.data.notifications)
    } catch (e) {
      handleActionErrors({ e, dispatch })
    }
  }

  const readAllNotificationsAsync = async () => {
    if (!notifications.some((item) => !item.readAt)) return
    try {
      await notificationsApi.readAll()
      getNotificationsAsync()
    } catch (e) {
      handleActionErrors({ e, dispatch })
    }
  }

  useEffect(() => {
    if (!openAuth) getNotificationsAsync()
  }, [openAuth])

  return (
    <>
      <ConnectWallet
        target={(onClick) => (
          <BaseButton onClick={onClick}>
            <NotificationIcon
              hasNotification={notifications.some((item) => !item.readAt)}
            />
          </BaseButton>
        )}
        onClick={() => {
          setOpenModal(true)
        }}
      />
      {!openAuth && (
        <Modal
          maxWidth="700px"
          withCloseButton={false}
          onClose={() => setOpenModal(false)}
          padding="50px 30px"
          open={openModal}
        >
          <Box
            marginBottom={40}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text variant="h7">Notifications</Text>
            <Box display="flex" gridGap="15px">
              <BaseButton
                onClick={() =>
                  push({
                    pathname: ROUTES.PROFILE,
                    query: { tab: NOTIFICATIONS_QUERY },
                  })
                }
              >
                <SettingsIcon />
              </BaseButton>
              <BaseButton
                onClick={() => {
                  readAllNotificationsAsync()
                  setOpenModal(false)
                }}
              >
                <CloseIcon />
              </BaseButton>
            </Box>
          </Box>
          <Box display="grid" gridGap={35}>
            {notifications.map((item) => (
              <Notification {...item} key={item.id} />
            ))}
            {notifications.length === 0 && (
              <Text variant="p2" color="primary600">
                {t('noNotifications')}
              </Text>
            )}
          </Box>
        </Modal>
      )}
    </>
  )
}
