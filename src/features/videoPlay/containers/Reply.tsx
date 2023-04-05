import { BaseButton } from '@/components/buttons/BaseButton'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { Text } from '@/components/Text'
import { Tooltip } from '@/components/Tooltip'
import { HEADER_HEIGHT } from '@/constants/leyout'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import { TComments, TReply } from '@/types/comments'
import { handleSrollEl } from '@/utils/handle-scroll-elements'
import { FC } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { setTargetComment } from '../store/videoPlay'

const UserName = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
  display: inline-block;
`

const ReplyButton = styled(Box)`
  border-radius: 20px;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.palette.accent300};
  color: ${({ theme }) => theme.palette.secondary100};
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 5px;
`

export const Reply: FC<{
  comment: TComments | TReply
  onDelete?: () => void
  style?: CSSProperties
}> = ({ comment, onDelete, style }) => {
  const { dispatch } = useRedux()
  const onScroll = () => {
    handleSrollEl(comment.id, HEADER_HEIGHT)
    dispatch(setTargetComment(comment.id))
  }

  return (
    <ReplyButton style={style}>
      <Box onClick={onScroll}>
        <Tooltip
          content={comment.user.name ?? comment.user.address}
          id={`${comment.id}_reply`}
        >
          <UserName tag="span" color="secondary100" variant="l2">
            {comment.user.name ?? comment.user.address}
          </UserName>
        </Tooltip>
      </Box>
      {onDelete && (
        <BaseButton onClick={onDelete}>
          <CloseIcon size="8" color="secondary200" />
        </BaseButton>
      )}
    </ReplyButton>
  )
}
