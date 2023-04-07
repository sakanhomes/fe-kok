import { BaseButton } from '@/components/buttons/BaseButton'
import { Text } from '@/components/Text'
import { useAuth } from '@/hooks/use-auth'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Comment } from './components/Comment'
import { LikeCommentActions } from './containers/LikeCommentActions'
import { AddComment } from './containers/AddComment'
import { getCommentsAsync, videoPlaySelector } from './store/videoPlay'

const SortButton = styled(BaseButton)`
  height: 24px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.palette.secondary300};
  padding: 0 4px;
`

export const Comments: FC<{ id: string }> = ({ id }) => {
  const { dispatch, select } = useRedux()
  const {
    comments: { data, sortingFetching },
  } = select(videoPlaySelector)
  const { t } = useTranslation('comments')
  const { user } = useAuth()

  useEffect(() => {
    dispatch(getCommentsAsync(id))
  }, [user])

  const memorizedComments = useMemo(() => data, [data])

  return (
    <Box>
      <Box display="flex" gridGap="6px" alignItems="center" marginBottom={21}>
        <Text variant="h7">
          {t('comments')} ({data.length})
        </Text>
        <SortButton
          isLoading={sortingFetching}
          onClick={() => dispatch(getCommentsAsync(id, { sort: 'latest' }))}
        >
          {t('latest')}
        </SortButton>
        <SortButton
          isLoading={sortingFetching}
          onClick={() => dispatch(getCommentsAsync(id, { sort: 'top' }))}
        >
          {t('top')}
        </SortButton>
      </Box>
      <Box marginBottom={30}>
        <AddComment id={id} />
      </Box>
      <Box display="grid" gridGap={20}>
        {memorizedComments.map((item) => (
          <Comment
            likeActions={() => (
              <LikeCommentActions
                id={id}
                onUpdate={() => dispatch(getCommentsAsync(id))}
                commentId={item.id}
                {...item.flags}
                likesAmount={item.likesAmount}
                dislikesAmount={item.dislikesAmount}
              />
            )}
            key={item.id}
            comment={item}
          />
        ))}
      </Box>
    </Box>
  )
}
