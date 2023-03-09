import React from 'react'
import type { NextPage } from 'next'
import { Layout } from '@/layouts/Layout'
import { SearchInput } from '@/features/search/SearchInput'
import { Categories } from '@/features/home/Categories'
import { RandomVideos } from '@/features/home/RandomVideos'

const Home: NextPage = () => (
  <Layout searchInput={<SearchInput />}>
    <Categories />
    <RandomVideos />
  </Layout>
)

export default Home
