import { Avatar } from '@/components/Avatar'
import { BaseButton } from '@/components/buttons/BaseButton'
import { ReplyIcon } from '@/components/icons/ReplyIcon'
import { Text } from '@/components/Text'
import { ROUTES } from '@/constants/routes'
import { useTimeAgo } from '@/hooks/use-time-ago'
import Box from '@/styles/Box'
import { TComments } from '@/types/comments'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import styled from 'styled-components'
import { Reply } from '../Reply'

const UserName = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`

export const Comment: FC<{ comment: TComments; likeActions: () => void }> = ({
  comment,
  likeActions,
}) => {
  const time = useTimeAgo(comment.createdAt)
  const { push } = useRouter()

  return (
    <Box>
      <BaseButton
        onClick={() =>
          push({ pathname: `${ROUTES.CREATOR_PAGE}/${comment.user.address}` })
        }
      >
        <Box display="flex" gridGap="5px" marginBottom="11px" alignItems="center">
          <Avatar sizes="xxs" avatar={comment.user.profileImage} />
          <UserName variant="p3">{comment.user.name ?? comment.user.address}</UserName>
          <Text color="primary500" variant="l2">
            {time}
          </Text>
        </Box>
      </BaseButton>
      <Text variant="l2" margin="0 0 4px 33px">
        {comment.repliedComment && (
          <>
            <Reply reply={comment.repliedComment} />{' '}
          </>
        )}
        {comment.content}
      </Text>
      <Box display="flex" gridGap={24} marginLeft={33}>
        {likeActions()}
        <BaseButton icon={{ place: 'prepend', el: <ReplyIcon color="accent300" /> }}>
          {comment.repliesAmount}
        </BaseButton>
      </Box>
    </Box>
  )
}
