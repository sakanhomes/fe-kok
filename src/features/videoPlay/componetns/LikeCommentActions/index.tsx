import { commentsApi } from '@/api/rest/comments'
import { BaseButton } from '@/components/buttons/BaseButton'
import { DislikeIcon } from '@/components/icons/DislikeIcon'
import { LikeIcon2 } from '@/components/icons/LikeIcon2'
import { useOpenAuth } from '@/hooks/use-open-auth'
import { useRedux } from '@/hooks/use-redux'
import { TComments } from '@/types/comments'
import { handleActionErrors } from '@/utils/handleActionErrors'
import React, { FC, useState } from 'react'

export const LikeCommentActions: FC<
  TComments['flags'] & {
    likesAmount: number
    dislikesAmount: number
    id: string
    commentId: string
    onUpdate: () => void
  }
> = ({ isLiked, isDisliked, likesAmount, dislikesAmount, id, commentId, onUpdate }) => {
  const [fetching, setFetching] = useState(false)

  const openAuth = useOpenAuth()
  const { dispatch } = useRedux()
  const setLikeAsync = async () => {
    if (openAuth) return openAuth()
    setFetching(true)
    try {
      if (!isLiked) await commentsApi.setLike(id, commentId)
      if (isLiked) await commentsApi.removeLike(id, commentId)
      onUpdate()
    } catch (e) {
      handleActionErrors({ e, dispatch })
    } finally {
      setFetching(false)
    }
  }

  const setDislikeAsync = async () => {
    if (openAuth) return openAuth()
    setFetching(true)
    try {
      if (!isDisliked) await commentsApi.setDislike(id, commentId)
      if (isDisliked) await commentsApi.removeDislike(id, commentId)
      onUpdate()
    } catch (e) {
      handleActionErrors({ e, dispatch })
    } finally {
      setFetching(false)
    }
  }

  return (
    <>
      <BaseButton
        onClick={setLikeAsync}
        isLoading={fetching}
        icon={{
          place: 'prepend',
          el: <LikeIcon2 color={isLiked ? 'danger100' : 'accent300'} />,
        }}
      >
        {likesAmount}
      </BaseButton>
      <BaseButton
        onClick={setDislikeAsync}
        isLoading={fetching}
        icon={{
          place: 'prepend',
          el: <DislikeIcon color={isDisliked ? 'danger100' : 'accent300'} />,
        }}
      >
        {dislikesAmount}
      </BaseButton>
    </>
  )
}
