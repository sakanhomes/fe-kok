import { BaseButton } from '@/components/buttons/BaseButton'
import { Text } from '@/components/Text'
import { TReply } from '@/types/comments'
import { FC } from 'react'
import styled from 'styled-components'

const UserName = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`

const ReplyButton = styled(BaseButton)`
  border-radius: 20px;
  background-color: ${({ theme }) => theme.palette.accent300};
  color: ${({ theme }) => theme.palette.secondary100};
`

export const Reply: FC<{ reply: TReply }> = ({ reply }) => (
  <ReplyButton>
    @<UserName>{reply.user.name ?? reply.user.address}</UserName>
  </ReplyButton>
)
