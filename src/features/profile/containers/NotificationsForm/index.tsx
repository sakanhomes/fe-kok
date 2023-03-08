import { FormikCheckbox } from '@/components/inputs/FormikCheckbox'
import { Text } from '@/components/Text'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import { TSettings } from '@/types/settings'
import { useFormik } from 'formik'
import React, { FC, useEffect } from 'react'
import styled from 'styled-components'
import Trans from 'next-translate/Trans'
import useTranslation from 'next-translate/useTranslation'
import { setNotificationsAsync, settingsSelector } from '../../store/settings'

const Form = styled.form`
  display: grid;
  gap: 36px;
  padding: 50px 320px 0;
`

export const NotificationsForm: FC = () => {
  const { dispatch, select } = useRedux()
  const { notifications } = select(settingsSelector)
  const { t } = useTranslation('settings')
  const formik = useFormik<TSettings>({
    initialValues: {
      'channel-activity': notifications
        ? notifications['notifications.events.channel-activity']
        : false,
      'comment-reply': notifications
        ? notifications['notifications.events.comment-reply']
        : false,
      mention: notifications ? notifications['notifications.events.mention'] : false,
      sharing: notifications ? notifications['notifications.events.sharing'] : false,
      subscription: notifications
        ? notifications['notifications.events.subscription']
        : false,
    },
    onSubmit: (formData) => {
      const newObj: TSettings = {}
      Object.keys(formData).forEach((key) => {
        newObj[`notifications.events.${key}`] = formData[key]
      })
      dispatch(setNotificationsAsync({ formData: newObj, formik }))
    },
  })

  useEffect(() => {
    if (!formik.isSubmitting && formik.dirty) {
      formik.handleSubmit()
    }
  }, [formik.values])

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Text variant="p3">{t('notification')}</Text>
      <Box>
        <FormikCheckbox
          type="checkbox"
          name="subscription"
          label={
            <Trans
              i18nKey="settings:notifications.title1"
              components={[
                <Text variant="p3" margin="0 0 5px" key={0} />,
                <Text variant="p3" key={1} />,
              ]}
            />
          }
          formik={formik}
          variant="secondary"
          disabled={formik.isSubmitting}
        />
      </Box>
      <Box>
        <FormikCheckbox
          type="checkbox"
          name="channel-activity"
          label={
            <Trans
              i18nKey="settings:notifications.title2"
              components={[
                <Text variant="p3" margin="0 0 5px" key={0} />,
                <Text variant="p3" key={1} />,
              ]}
            />
          }
          formik={formik}
          variant="secondary"
          disabled={formik.isSubmitting}
        />
      </Box>
      <Box>
        <FormikCheckbox
          type="checkbox"
          name="mention"
          label={
            <Trans
              i18nKey="settings:notifications.title3"
              components={[
                <Text variant="p3" margin="0 0 5px" key={0} />,
                <Text variant="p3" key={1} />,
              ]}
            />
          }
          formik={formik}
          variant="secondary"
          disabled={formik.isSubmitting}
        />
      </Box>
      <Box>
        <FormikCheckbox
          type="checkbox"
          name="comment-reply"
          label={
            <Trans
              i18nKey="settings:notifications.title4"
              components={[
                <Text variant="p3" margin="0 0 5px" key={0} />,
                <Text variant="p3" key={1} />,
              ]}
            />
          }
          formik={formik}
          variant="secondary"
          disabled={formik.isSubmitting}
        />
      </Box>
      <Box>
        <FormikCheckbox
          type="checkbox"
          name="sharing"
          label={
            <Trans
              i18nKey="settings:notifications.title5"
              components={[
                <Text variant="p3" margin="0 0 5px" key={0} />,
                <Text variant="p3" key={1} />,
              ]}
            />
          }
          formik={formik}
          variant="secondary"
          disabled={formik.isSubmitting}
        />
      </Box>
    </Form>
  )
}
