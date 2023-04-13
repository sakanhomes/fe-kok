import React from 'react'
import type { NextPage } from 'next'
import { Layout } from '@/layouts/Layout'
import { SearchInput } from '@/features/search/SearchInput'
import { VideoViewer } from '@/features/videoPlay/VideoViewer'
import Box from '@/components/Box'
import { RealatedVideos } from '@/features/videoPlay/RelatedVideos'
import { Comments } from '@/features/videoPlay/Comments'

const Video: NextPage = () => (
  <Layout searchInput={<SearchInput />}>
    <Box display="grid" gridTemplateColumns="2fr 1fr" gridGap={15}>
      <VideoViewer commnets={(id) => <Comments id={id} />} />
      <RealatedVideos />
    </Box>
  </Layout>
)

export default Video
