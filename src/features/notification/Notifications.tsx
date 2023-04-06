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
import Box from '@/styles/Box'
import { TNotification } from '@/types/notification'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { Notification } from './components/Notification'

export const Notifications: FC = () => {
  const openAuth = useOpenAuth()
  const { dispatch } = useRedux()
  const [notifications, setNotifications] = useState<TNotification[]>([])
  const [openModal, setOpenModal] = useState(false)
  const { push } = useRouter()

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
      <BaseButton
        onClick={() => {
          if (openAuth) openAuth()
          else setOpenModal(true)
        }}
      >
        <NotificationIcon hasNotification={notifications.some((item) => !item.readAt)} />
        {!openAuth && (
          <Modal maxWidth="612px" padding="50px 30px" open={openModal}>
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
            </Box>
          </Modal>
        )}
      </BaseButton>
    </>
  )
}
