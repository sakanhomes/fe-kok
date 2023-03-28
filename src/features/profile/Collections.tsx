import Box from '@/styles/Box'
import { TFormik } from '@/types/formik'
import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { useCollections } from '@/features/profile/hooks/useCollections'
import { SearchInput } from './components/SearchInput'
import { Collection } from './containers/Collection'

const ContentWrapper = styled(Box)`
  border-top: 1px solid ${({ theme }) => theme.palette.secondary200};
  padding-top: 49px;
  margin-top: 49px;
`

export const Collections: FC = () => {
  const collections = useCollections()
  const [searchForm, setSearchForm] = useState<{
    value: string
    formik?: TFormik
  } | null>(null)

  return (
    <Box paddingTop={102}>
      <SearchInput onSubmit={(value, formik) => setSearchForm({ value, formik })} />
      <ContentWrapper maxWidth={1050} display="grid" gridGap={20} marginX="auto">
        {collections.map((item) => (
          <Collection searchForm={searchForm} data={item} key={item.id} />
        ))}
      </ContentWrapper>
    </Box>
  )
}
