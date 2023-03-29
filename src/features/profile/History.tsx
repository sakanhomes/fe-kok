import { PlayArrow } from '@/components/icons/PlayArrow'
import { Text } from '@/components/Text'
import Box from '@/styles/Box'
import { format } from 'date-fns'
import React, { FC } from 'react'
import styled from 'styled-components'
import { SearchInput } from './components/SearchInput'
import { VideoHistory } from './components/VideoHistory'
import { useHistory } from './hooks/useHistory'

export const History: FC = () => {
  const { history, setHistory } = useHistory()

  return (
    <Box paddingTop={102}>
      <SearchInput onSubmit={setHistory} />
      {history && (
        <Box maxWidth={1050} marginX="auto">
          {Object.keys(history).map((key) => (
            <Box key={key} marginY={37} display="grid" gridGap={15}>
              <Text variant="p3">
                {format(new Date(key), 'MMM dd yyyy')} <PlayArrow />
              </Text>

              {history[key].map((item) => (
                <VideoHistory {...item} key={item.id} />
              ))}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}
