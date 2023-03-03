import React from 'react'
import type { NextPage } from 'next'
import { Layout } from '@/layouts/Layout'
import { SearchInput } from '@/features/search/SearchInput'
import { PermissionsAuth } from '@/containers/permissions/PermissionAuth'

const Profile: NextPage = () => (
  <PermissionsAuth>
    <Layout searchInput={<SearchInput />}>Profile</Layout>
  </PermissionsAuth>
)

export default Profile
