import { Avatar } from '@/components/Avatar'
import { BaseButton } from '@/components/buttons/BaseButton'
import { Modal } from '@/components/modals/Modal'
import { Text } from '@/components/Text'
import { Tooltip } from '@/components/Tooltip'
import { UploadFiles } from '@/components/UploadFiles'
import { useAuth } from '@/hooks/use-auth'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import { rgba } from 'emotion-rgba'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { settingsSelector, uploadImageAsync } from '../../store/settings'

const StatsItem = styled(Box).attrs((props) => ({
  as: 'li',
  ...props,
}))`
  text-align: center;
  width: 113px;
  height: 50px;
  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  :not(:last-of-type) {
    border-right: 1px solid ${({ theme }) => theme.palette.primary500};
  }
`

const StyledAvatar = styled(Avatar)`
  filter: drop-shadow(0px 4px 4px ${({ theme }) => rgba(theme.palette.primary100, 0.25)});
`

const UserName = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`

const UplaodButton = styled(BaseButton)`
  height: 38px;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.palette.accent300};
  border-radius: 8px;
`

export const User: FC = () => {
  const { user } = useAuth()
  const { dispatch, select } = useRedux()
  const { imageLocal } = select(settingsSelector)
  const { t } = useTranslation('settings')
  const [openDrop, setOpenDrop] = useState(false)

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gridGap={32}>
      {user && (
        <>
          <StyledAvatar sizes="xl" avatar={imageLocal?.avatar ?? user?.profileImage} />
          <Tooltip
            isTooltiped={!user.name}
            id={`${user.address}user`}
            content={user.address}
          >
            <UserName variant="h5" tag="h2" color="primary100">
              {user.name ?? user.address}
            </UserName>
          </Tooltip>
          <Box display="flex" as="ul" alignItems="center">
            <StatsItem>
              <Text color="primary100" variant="p1">
                {user.videosAmount.toString()}
              </Text>
              <Text color="primary500" variant="p2">
                {t('videos')}
              </Text>
            </StatsItem>
            <StatsItem>
              <Text color="primary100" variant="p1">
                {user.subscribersAmount.toString()}
              </Text>
              <Text color="primary500" variant="p2">
                {t('followers')}
              </Text>
            </StatsItem>
            <StatsItem>
              <Text color="primary100" variant="p1">
                {user.subscriptionsAmount.toString()}
              </Text>
              <Text color="primary500" variant="p2">
                {t('following')}
              </Text>
            </StatsItem>
          </Box>
          <Box>
            <UplaodButton color="secondary100" onClick={() => setOpenDrop(true)}>
              {t('uploadNewAvatar')}
            </UplaodButton>
            <Modal
              open={openDrop}
              padding="61px 77px"
              maxWidth="fit-content"
              onClose={() => {
                setOpenDrop(false)
              }}
            >
              <UploadFiles
                type="images"
                onDropAccepted={(file) => {
                  dispatch(uploadImageAsync(file, () => setOpenDrop(false), 'avatar'))
                }}
              />
            </Modal>
          </Box>
          <Box maxWidth={318}>
            <Text color="primary500">{user.description ?? 'About me...'}</Text>
          </Box>
        </>
      )}
    </Box>
  )
}
