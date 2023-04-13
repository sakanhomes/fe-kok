import { BaseButton } from '@/components/buttons/BaseButton'
import { Text } from '@/components/Text'
import { setCommingSoon } from '@/containers/comming-soon/store'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/components/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import styled from 'styled-components'
import { creatorCenterSelector, setActiveTab } from './store/creatorCenter'

const Button = styled(BaseButton)<{ $active: boolean }>`
  min-width: 226px;
  height: 60px;
  background-color: ${({ theme, $active }) =>
    $active ? theme.palette.accent300 : theme.palette.secondary100};
  border-radius: 20px;
  justify-content: center;
`

export const CreatorCenterTabs: FC = () => {
  const { dispatch, select } = useRedux()
  const { activeTab } = select(creatorCenterSelector)
  const { t } = useTranslation('creator-center')

  return (
    <Box display="flex" gridGap={20} marginBottom={82}>
      <Button
        $active={activeTab === 'videos'}
        onClick={() => dispatch(setActiveTab('videos'))}
      >
        <Text
          color={activeTab === 'videos' ? 'secondary100' : 'primary100'}
          fontWeight={activeTab === 'videos' ? 600 : 400}
          variant="h4"
        >
          {t('myVideos')}
        </Text>
      </Button>
      <Button
        $active={activeTab === 'articles'}
        onClick={() => dispatch(setCommingSoon(true))}
      >
        <Text
          color={activeTab === 'articles' ? 'secondary100' : 'primary100'}
          fontWeight={activeTab === 'articles' ? 600 : 400}
          variant="h4"
        >
          {t('myArticles')}
        </Text>
      </Button>
    </Box>
  )
}
