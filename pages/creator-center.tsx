import React from 'react'
import type { NextPage } from 'next'
import { Layout } from '@/layouts/Layout'
import { SearchInput } from '@/features/search/SearchInput'
import { PermissionsAuth } from '@/containers/permissions/PermissionAuth'

const Home: NextPage = () => (
  <PermissionsAuth>
    <Layout searchInput={<SearchInput />}>Creator Center</Layout>
  </PermissionsAuth>
)

export default Home
