import { BaseButton } from '@/components/buttons/BaseButton'
import { UploadFiles } from '@/components/UploadFiles'
import { useAuth } from '@/hooks/use-auth'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import React, { FC, useEffect } from 'react'
import { actionsAsync } from 'store/auth'
import styled from 'styled-components'
import baseProfile from '@/assets/base-profile-bg.jpg'
import { rgba } from 'emotion-rgba'
import {
  resetSettings,
  setProfileData,
  settingsSelector,
  uploadImageAsync,
} from '../../store/settings'
import { BaseInfo } from '../BaseInfo'
import { User } from '../User'

const UserWrapper = styled(Box)`
  border-right: 1px solid ${({ theme }) => theme.palette.primary500};
`

const Uplaod = styled(UploadFiles)`
  border: none;
  border-radius: 8px;
`

const UplaodButton = styled(BaseButton)`
  height: 40px;
  padding: 0 10px;
  background-color: ${({ theme }) => rgba(theme.palette.primary200, 0.5)};
  border-radius: 8px;
`

export const Profile: FC = () => {
  const { select, dispatch } = useRedux()
  const { user } = useAuth()
  const { profileData, imageLocal } = select(settingsSelector)

  useEffect(() => {
    if (!user)
      dispatch(actionsAsync.getProfileAsync(() => dispatch(setProfileData(user))))
    else dispatch(setProfileData(user))
    return () => {
      dispatch(resetSettings())
    }
  }, [])

  return (
    profileData && (
      <Box display="grid" marginTop={24} paddingRight={48} gridTemplateColumns="40% 60%">
        <UserWrapper>
          <User />
        </UserWrapper>
        <Box paddingTop={41} paddingLeft={89}>
          <BaseInfo />
          <Box marginTop={32}>
            <Uplaod
              bg={`url(${imageLocal?.bg ?? user?.backgroundImage ?? baseProfile.src})`}
              customContent={({ open }) => (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height={104}
                >
                  <UplaodButton color="secondary100" onClick={open}>
                    Change Background
                  </UplaodButton>
                </Box>
              )}
              type="images"
              onDropAccepted={(file) => {
                dispatch(uploadImageAsync(file))
              }}
            />
          </Box>
        </Box>
      </Box>
    )
  )
}
