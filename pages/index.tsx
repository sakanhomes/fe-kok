import React from 'react'
import type { NextPage } from 'next'
import { Layout } from '@/layouts/Layout'
import { SearchInput } from '@/features/search/SearchInput'
import { Categories } from '@/features/home/Categories'

const Home: NextPage = () => (
  <Layout searchInput={<SearchInput />}>
    <Categories />
  </Layout>
)

export default Home
