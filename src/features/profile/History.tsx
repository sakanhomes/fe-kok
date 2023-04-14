import { PlayArrow } from '@/components/icons/PlayArrow'
import { Loader } from '@/components/loaders/Loader'
import { Text } from '@/components/Text'
import Box from '@/components/Box'
import { format } from 'date-fns'
import React, { FC } from 'react'
import styled from 'styled-components'
import { SearchInput } from './components/SearchInput'
import { VideoHistory } from './components/VideoHistory'
import { useHistory } from './hooks/useHistory'

const HistoryDate = styled(Text)`
  display: flex;
  gap: 10px;
  align-items: center;
`

export const History: FC = () => {
  const { history, setHistory, fetching } = useHistory()

  return (
    <Box paddingTop={102}>
      <SearchInput onSubmit={setHistory} />
      {history && !fetching && (
        <Box maxWidth={1050} marginX="auto">
          {Object.keys(history).map((key) => (
            <Box key={key} marginY={37} display="grid" gridGap={15}>
              <HistoryDate variant="p3">
                {format(new Date(key), 'MMM dd yyyy')} <PlayArrow color="primary500" />
              </HistoryDate>

              {history[key].map((item, id) => (
                <VideoHistory {...item} key={item.id + id} />
              ))}
            </Box>
          ))}
        </Box>
      )}
      {fetching && <Loader />}
    </Box>
  )
}
