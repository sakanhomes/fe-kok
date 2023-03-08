import { useAuth } from '@/hooks/use-auth'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import React, { FC, useEffect } from 'react'
import { actionsAsync } from 'store/auth'
import styled from 'styled-components'
import { resetSettings, setProfileData, settingsSelector } from '../../store/settings'
import { BaseInfo } from '../BaseInfo'
import { User } from '../User'

const UserWrapper = styled(Box)`
  border-right: 1px solid ${({ theme }) => theme.palette.primary500};
`

export const Profile: FC = () => {
  const { select, dispatch } = useRedux()
  const { user } = useAuth()
  const { profileData } = select(settingsSelector)

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
        </Box>
      </Box>
    )
  )
}
