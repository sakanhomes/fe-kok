import { Loader } from '@/components/loaders/Loader'
import { Text } from '@/components/Text'
import Box from '@/components/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect } from 'react'
import { TabLink } from '../../components/Title'
import { UserCard } from '../../components/UserCard'
import { useUser } from '../../hooks/useUser'

export const Users: FC<{ tab: 'video' | 'creator' | null; onMoveTo: () => void }> = ({
  tab,
  onMoveTo,
}) => {
  const { users, fetching, getUsers } = useUser()
  const { t } = useTranslation('search')

  useEffect(() => {
    getUsers()
  }, [tab])

  if (fetching) return <Loader />

  return (
    <Box>
      <TabLink disabled={tab === 'creator'} onClick={onMoveTo}>
        {t('relatedCreators')}
      </TabLink>
      <Box marginTop={18} display="grid" gridGap={20}>
        {users.map((item) => (
          <UserCard key={item.address} user={item} />
        ))}
      </Box>
      {users.length === 0 && (
        <Text variant="p2" color="primary500">
          {t('noUsersFound')}
        </Text>
      )}
    </Box>
  )
}
