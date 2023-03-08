import { useRedux } from '@/hooks/use-redux'
import React, { FC, useEffect } from 'react'
import { getNotificationsAsync, settingsSelector } from '../../store/settings'
import { NotificationsForm } from '../NotificationsForm'

export const Notifications: FC = () => {
  const { dispatch, select } = useRedux()
  const { notifications } = select(settingsSelector)

  useEffect(() => {
    dispatch(getNotificationsAsync())
  }, [])

  return notifications && <NotificationsForm />
}
