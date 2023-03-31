import React from 'react'
import type { NextPage } from 'next'
import { Layout } from '@/layouts/Layout'
import { SearchInput } from '@/features/search/SearchInput'
import { SearchPage } from '@/features/search/SearchPage'

const Home: NextPage = () => (
  <Layout searchInput={<SearchInput />}>
    <SearchPage />
  </Layout>
)

export default Home
