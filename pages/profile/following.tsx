import React from 'react'
import type { NextPage } from 'next'
import { Layout } from '@/layouts/Layout'
import { SearchInput } from '@/features/search/SearchInput'
import { PermissionsAuth } from '@/containers/permissions/PermissionAuth'
import { ProfileLayout } from '@/layouts/pages/profile/ProfileLayout'
import { ProfileHeader } from '@/features/profile/ProfileHeader'

const Profile: NextPage = () => (
  <PermissionsAuth>
    <Layout withSpaces={false} searchInput={<SearchInput />}>
      <ProfileLayout header={<ProfileHeader />}>Following</ProfileLayout>
    </Layout>
  </PermissionsAuth>
)

export default Profile
