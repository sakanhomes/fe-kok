import React from 'react'
import type { NextPage } from 'next'
import { Layout } from '@/layouts/Layout'
import { SearchInput } from '@/features/search/SearchInput'
import { VideoViewer } from '@/features/videoPlay/VideoViewer'
import Box from '@/styles/Box'

const Video: NextPage = () => (
  <Layout searchInput={<SearchInput />}>
    <Box display="grid" gridTemplateColumns="2fr 1fr" gridGap={15}>
      <VideoViewer />
    </Box>
  </Layout>
)

export default Video
