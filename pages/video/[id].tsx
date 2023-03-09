import React from 'react'
import type { NextPage } from 'next'
import { Layout } from '@/layouts/Layout'
import { SearchInput } from '@/features/search/SearchInput'

const Video: NextPage = () => <Layout searchInput={<SearchInput />}>Video page</Layout>

export default Video
