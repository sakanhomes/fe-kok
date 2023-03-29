import React from 'react'
import type { NextPage } from 'next'
import { Layout } from '@/layouts/Layout'
import { SearchInput } from '@/features/search/SearchInput'
import { CreatorHeader } from '@/features/creatorPage/CreatorHeader'
import { CreatorLayout } from '@/layouts/pages/creator/CreatorLayout'
import { CreatorContent } from '@/features/creatorPage/CreatorContent'

const CreatorPage: NextPage = () => (
  <Layout withSpaces={false} searchInput={<SearchInput />}>
    <CreatorLayout header={<CreatorHeader />}>
      <CreatorContent />
    </CreatorLayout>
  </Layout>
)

export default CreatorPage
