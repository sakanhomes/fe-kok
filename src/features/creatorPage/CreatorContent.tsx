import { Text } from '@/components/Text'
import { setCommingSoon } from '@/containers/comming-soon/store'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/components/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useState } from 'react'
import styled, { css } from 'styled-components'
import { Collection } from './containers/Collection'
import { Videos } from './containers/Videos'

const Tabs = styled(Box)`
  border-radius: 8px;
  overflow: hidden;
`

const Tab = styled(Box)<{ $active: boolean }>((props) => {
  const { $active } = props

  const notActive = css`
    background-color: ${({ theme }) => theme.palette.secondary300};
    border-left: 5px solid ${({ theme }) => theme.palette.primary600};
  `
  const active = css`
    background-color: ${({ theme }) => theme.palette.accent300};
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-left: 5px solid ${({ theme }) => theme.palette.accent100};
    p {
      color: ${({ theme }) => theme.palette.secondary100} !important;
    }
  `
  return css`
    height: 59px;
    width: 194px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 300ms;
    ${$active ? active : notActive}
  `
})

export const CreatorContent: FC = () => {
  const [tab, setTab] = useState<'all_videos' | 'collections' | 'column' | 'nft'>(
    'all_videos'
  )
  const { dispatch } = useRedux()
  const { t } = useTranslation('common')

  return (
    <Box
      maxWidth={1262}
      padding={20}
      marginX="auto"
      display="flex"
      marginTop={96}
      gridGap={44}
    >
      <Box marginTop={68}>
        <Tabs as="ul" display="grid" gridGap="1px">
          <Tab
            as="li"
            onClick={() => setTab('all_videos')}
            $active={tab === 'all_videos'}
          >
            <Text variant="h5">{t('all_videos')}</Text>
          </Tab>
          <Tab
            as="li"
            onClick={() => setTab('collections')}
            $active={tab === 'collections'}
          >
            <Text variant="h5">{t('collection')}</Text>
          </Tab>
          <Tab
            as="li"
            onClick={() => dispatch(setCommingSoon(true))}
            $active={tab === 'column'}
          >
            <Text variant="h5">{t('column')}</Text>
          </Tab>
          <Tab
            as="li"
            onClick={() => dispatch(setCommingSoon(true))}
            $active={tab === 'nft'}
          >
            <Text variant="h5">{t('nft')}</Text>
          </Tab>
        </Tabs>
      </Box>
      <Box width="100%">
        {tab === 'all_videos' && <Videos />}
        {tab === 'collections' && <Collection />}
      </Box>
    </Box>
  )
}
