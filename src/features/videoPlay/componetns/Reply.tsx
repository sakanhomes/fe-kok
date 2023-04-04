import { BaseButton } from '@/components/buttons/BaseButton'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { Text } from '@/components/Text'
import Box from '@/styles/Box'
import { TReply } from '@/types/comments'
import { FC } from 'react'
import styled from 'styled-components'

const UserName = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`

const ReplyButton = styled(Box)`
  border-radius: 20px;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.palette.accent300};
  color: ${({ theme }) => theme.palette.secondary100};
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: default;
`

export const Reply: FC<{ reply: TReply; onDelete?: () => void }> = ({
  reply,
  onDelete,
}) => (
  <ReplyButton>
    <UserName color="secondary100" variant="l2">
      {reply.user.name ?? reply.user.address}
    </UserName>
    {onDelete && (
      <BaseButton>
        <CloseIcon size="8" color="secondary200" />
      </BaseButton>
    )}
  </ReplyButton>
)
