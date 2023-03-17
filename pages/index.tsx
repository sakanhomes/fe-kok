import React from 'react'
import type { NextPage } from 'next'
import { Layout } from '@/layouts/Layout'
import { SearchInput } from '@/features/search/SearchInput'
import { Categories } from '@/features/home/Categories'
import { RandomVideos } from '@/features/home/RandomVideos'
import Box from '@/styles/Box'
import { DiscoverVideo } from '@/features/home/DiscoverVideo'
import { Leaderboard } from '@/features/home/Leaderboard'

const Home: NextPage = () => (
  <Layout searchInput={<SearchInput />}>
    <Box
      height="443px"
      display="grid"
      gridTemplateColumns="2fr 1fr"
      gridGap={40}
      marginBottom={47}
    >
      <DiscoverVideo />
      <Leaderboard />
    </Box>
    <Categories />
    <RandomVideos />
  </Layout>
)

export default Home
