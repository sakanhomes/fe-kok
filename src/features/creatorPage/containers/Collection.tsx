import { Text } from '@/components/Text'
import { VideoCard } from '@/components/VideoCard'
import Box from '@/components/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import styled from 'styled-components'
import { useCollection } from '../hooks/useCollection'

const Title = styled(Text)`
  font-weight: 500;
  font-size: 18px;
  height: 43px;
  line-height: 13px;
  letter-spacing: 0.025em;
  text-transform: capitalize;
  color: ${({ theme }) => theme.palette.primary100};
  padding-left: 18px;
  border-left: 3px solid ${({ theme }) => theme.palette.primary100};
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`

export const Collection: FC = () => {
  const { collection } = useCollection()
  const { t } = useTranslation('common')

  return (
    <Box>
      <Title>{t('collection')}</Title>
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gridGap={20}>
        {collection.map((item) => (
          <VideoCard uniqId={`${item.id}creator_videos`} key={item.id} {...item} />
        ))}
      </Box>
    </Box>
  )
}
