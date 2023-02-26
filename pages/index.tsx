import React from 'react'
import type { NextPage } from 'next'
import { Layout } from '@/layouts/Layout'
import { SearchInput } from '@/features/search/SearchInput'

const Home: NextPage = () => <Layout searchInput={<SearchInput />}>Home</Layout>

export default Home
