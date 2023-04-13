import { BaseButton } from '@/components/buttons/BaseButton'
import Box from '@/components/Box'
import { rgba } from 'emotion-rgba'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useState } from 'react'
import styled, { css } from 'styled-components'
import { Users } from './containers/Users'
import { Videos } from './containers/Videos'

const Tab = styled(BaseButton)<{ $active: boolean }>(({ theme, $active }) => {
  const { palette } = theme

  return css`
    padding: 0 30px;
    height: 100%;
    justify-content: center;
    transition: 0.3s;
    font-weight: 300;
    font-size: 17px;
    line-height: 13px;
    border-bottom: 3px solid ${$active ? palette.accent300 : rgba(palette.accent300, 0)};
    transform: translateY(1.5px);
  `
})

const StyledBox = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary500};
`

export const SearchPage: FC = () => {
  const [tab, setTab] = useState<'video' | 'creator' | null>(null)
  const { t } = useTranslation('search')

  return (
    <Box width={1020} marginX="auto">
      <Box marginBottom={25}>
        <StyledBox height={33} display="flex" gridGap="5px">
          <Tab onClick={() => setTab(null)} $active={tab === null}>
            {t('all')}
          </Tab>
          <Tab onClick={() => setTab('video')} $active={tab === 'video'}>
            {t('videos')}
          </Tab>
          <Tab onClick={() => setTab('creator')} $active={tab === 'creator'}>
            {t('creators')}
          </Tab>
        </StyledBox>
      </Box>
      {(tab === 'creator' || tab === null) && (
        <Users onMoveTo={() => setTab('creator')} tab={tab} />
      )}
      {tab === null && <StyledBox marginTop={42} marginBottom={64} />}
      {(tab === 'video' || tab === null) && (
        <Videos
          tab={tab}
          onMoveTo={() => setTab('video')}
          isHorizontal={tab === 'video'}
        />
      )}
    </Box>
  )
}
