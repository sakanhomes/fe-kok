import { Avatar } from '@/components/Avatar'
import { BaseButton } from '@/components/buttons/BaseButton'
import { ReplyIcon } from '@/components/icons/ReplyIcon'
import { Text } from '@/components/Text'
import { COMMENT_INPUT } from '@/constants/ids'
import { ROUTES } from '@/constants/routes'
import { useRedux } from '@/hooks/use-redux'
import { useTimeAgo } from '@/hooks/use-time-ago'
import Box from '@/components/Box'
import { TComments } from '@/types/comments'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import styled from 'styled-components'
import { Tooltip } from '@/components/Tooltip'
import { setReply, videoPlaySelector } from '../../store/videoPlay'
import { Reply } from '../../containers/Reply'

const UserName = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`

const Wrapper = styled(Box)<{ target: boolean }>`
  display: grid;
  overflow-anchor: 100px;
  transition: 500ms;
  background-color: ${({ theme, target }) => target && theme.palette.accent400};
  border-radius: 10px;
`

export const Comment: FC<{ comment: TComments; likeActions: () => void }> = ({
  comment,
  likeActions,
}) => {
  const time = useTimeAgo(comment.createdAt)
  const { push } = useRouter()
  const { dispatch, select } = useRedux()
  const {
    video,
    comments: { targetComment },
  } = select(videoPlaySelector)

  return (
    <Wrapper target={targetComment === comment.id} id={comment.id}>
      <Box>
        <BaseButton
          onClick={() =>
            push({ pathname: `${ROUTES.CREATOR_PAGE}/${comment.user.address}` })
          }
        >
          <Box display="flex" gridGap="5px" marginBottom="11px" alignItems="center">
            <Avatar bordered={false} sizes="xxs" avatar={comment.user.profileImage} />
            <Tooltip
              content={comment.user.name ?? comment.user.address}
              id={`${comment.id}user_name`}
            >
              <UserName variant="p3">
                {comment.user.name ?? comment.user.address}
              </UserName>
            </Tooltip>
            <Text color="primary500" variant="l2">
              {time}
            </Text>
          </Box>
        </BaseButton>
        <Box marginLeft={33} marginBottom="5px">
          <Text tag="div" variant="l2">
            {comment.repliedComment && video && (
              <>
                <Reply
                  comment={comment.repliedComment}
                  style={{ display: 'inline-block', padding: '0 5px' }}
                />{' '}
              </>
            )}
            <span>{comment.content}</span>
          </Text>
        </Box>
        <Box display="flex" gridGap={24} marginLeft={33}>
          {likeActions()}
          <Box
            display="flex"
            alignItems="center"
            gridGap="10px"
            onClick={() => dispatch(setReply(comment))}
          >
            <a href={`#${COMMENT_INPUT}`}>
              <ReplyIcon color="accent300" />
            </a>
            {comment.repliesAmount}
          </Box>
        </Box>
      </Box>
    </Wrapper>
  )
}
