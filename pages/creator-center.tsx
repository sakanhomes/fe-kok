import React from 'react'
import type { NextPage } from 'next'
import { Layout } from '@/layouts/Layout'
import { SearchInput } from '@/features/search/SearchInput'
import { PermissionsAuth } from '@/containers/permissions/PermissionAuth'
import { CreatorCenterTabs } from '@/features/creatorCenter/CreatorCenterTabs'
import { CreatorCenterVideos } from '@/features/creatorCenter/CreatorCenterVideos'
import { UploadModal } from '@/features/uploadVideo/UploadModal'

const CreatorCenter: NextPage = () => (
  <PermissionsAuth>
    <Layout searchInput={<SearchInput />}>
      <CreatorCenterTabs />
      <CreatorCenterVideos uploadVideo={(args) => <UploadModal {...args} />} />
    </Layout>
  </PermissionsAuth>
)

export default CreatorCenter
