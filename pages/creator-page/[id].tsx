import React from 'react'
import type { NextPage } from 'next'
import { Layout } from '@/layouts/Layout'
import { SearchInput } from '@/features/search/SearchInput'

const CreatorPage: NextPage = () => (
  <Layout searchInput={<SearchInput />}>Creator page</Layout>
)

export default CreatorPage
