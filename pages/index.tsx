import React from 'react'
import type { NextPage } from 'next'
import { Layout } from '@/layouts/Layout'
import { SearchInput } from '@/features/search/SearchInput'
import { Categories } from '@/features/homeVideos/Categories'
import { RandomVideos } from '@/features/homeVideos/RandomVideos'
import Box from '@/components/Box'
import { DiscoverVideo } from '@/features/discoverVideo/DiscoverVideo'
import { Leaderboard } from '@/features/leaderboard/Leaderboard'
import { TrendingVideos } from '@/features/homeVideos/Trending'

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
    <TrendingVideos />
    <RandomVideos />
  </Layout>
)

export default Home
