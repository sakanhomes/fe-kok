import { Avatar } from '@/components/Avatar'
import { BaseButton } from '@/components/buttons/BaseButton'
import { DislikeIcon } from '@/components/icons/DislikeIcon'
import { LikeIcon2 } from '@/components/icons/LikeIcon2'
import { ReplyIcon } from '@/components/icons/ReplyIcon'
import { Text } from '@/components/Text'
import { useTimeAgo } from '@/hooks/use-time-ago'
import Box from '@/styles/Box'
import { TComments } from '@/types/comments'
import React, { FC } from 'react'
import styled from 'styled-components'
import { Reply } from '../Reply'

const UserName = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`

export const Comment: FC<{ comment: TComments }> = ({ comment }) => {
  const time = useTimeAgo(comment.createdAt)

  return (
    <Box>
      <Box display="flex" gridGap="5px" marginBottom="11px" alignItems="center">
        <Avatar sizes="xxs" avatar={comment.user.profileImage} />
        <UserName variant="p3">{comment.user.name ?? comment.user.address}</UserName>
        <Text color="primary500" variant="l2">
          {time}
        </Text>
      </Box>
      <Text variant="l2" margin="0 0 4px 33px">
        {comment.repliedComment && (
          <>
            <Reply reply={comment.repliedComment} />{' '}
          </>
        )}
        {comment.content}
      </Text>
      <Box display="flex" gridGap={24} marginLeft={33}>
        <BaseButton
          icon={{
            place: 'prepend',
            el: <LikeIcon2 color={comment.flags.isLiked ? 'danger100' : 'accent300'} />,
          }}
        >
          {comment.likesAmount}
        </BaseButton>
        <BaseButton
          icon={{
            place: 'prepend',
            el: <DislikeIcon color={comment.flags.isLiked ? 'danger100' : 'accent300'} />,
          }}
        >
          {comment.likesAmount}
        </BaseButton>
        <BaseButton icon={{ place: 'prepend', el: <ReplyIcon color="accent300" /> }}>
          {comment.repliesAmount}
        </BaseButton>
      </Box>
    </Box>
  )
}
