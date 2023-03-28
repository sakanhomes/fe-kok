import { VideoCard } from '@/components/VideoCard'
import Box from '@/styles/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import styled from 'styled-components'
import { SearchInput } from './components/SearchInput'
import { Title } from './components/Title'
import { useFavorites } from './hooks/useFavorites'

const ContentWrapper = styled(Box)`
  border-top: 1px solid ${({ theme }) => theme.palette.secondary200};
  padding-top: 49px;
  margin-top: 49px;
`

export const Favorites: FC = () => {
  const { favorites, setFavorites } = useFavorites()
  const { t } = useTranslation('settings')

  return (
    <Box paddingTop={102}>
      <SearchInput onSubmit={setFavorites} />
      <ContentWrapper maxWidth={1050} marginX="auto">
        <Title>{t('myFavorites')}</Title>
        <Box
          marginTop={18}
          display="grid"
          gridGap={20}
          gridTemplateColumns="repeat(4, 1fr)"
        >
          {favorites.map((item) => (
            <VideoCard uniqId={`${item.id}_favorites`} {...item} key={item.id} />
          ))}
        </Box>
      </ContentWrapper>
    </Box>
  )
}
