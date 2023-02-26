import React from 'react'
import type { NextPage } from 'next'
import { Layout } from '@/layouts/Layout'
import { SearchInput } from '@/features/search/SearchInput'

const Home: NextPage = () => <Layout searchInput={<SearchInput />}>Search Page</Layout>

export default Home
