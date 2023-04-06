import { commentsApi } from '@/api/rest/comments'
import { Avatar } from '@/components/Avatar'
import { BaseButton } from '@/components/buttons/BaseButton'
import { SendArrow } from '@/components/icons/SendArrow'
import { FormikInput } from '@/components/inputs/FormikInput'
import { COMMENT_INPUT } from '@/constants/ids'
import { useAuth } from '@/hooks/use-auth'
import { useOpenAuth } from '@/hooks/use-open-auth'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import { TFormik } from '@/types/formik'
import { handleActionErrors } from '@/utils/handleActionErrors'
import { useFormik } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import styled from 'styled-components'
import { Reply } from '../Reply'
import { getCommentsAsync, setReply, videoPlaySelector } from '../../store/videoPlay'

const Input = styled(FormikInput)`
  border-radius: 30px;
  padding: 0 9px;
  gap: 14px;
  height: 57px;
  input {
    font-size: 12px;
    height: auto;
    padding-left: 10px;
    ::placeholder {
      font-size: 12px;
    }
    border-radius: 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  border-color: ${({ theme }) => theme.palette.secondary200};
`

const SendButton = styled(BaseButton)`
  margin-right: 15px !important;
`

const Wrapper = styled(Box)`
  display: grid;
  margin-top: -100px;
  :before {
    content: '';
    display: block;
    height: 100px;
    width: 100%;
    pointer-events: none;
  }
`

export const AddComment: FC<{ id: string }> = ({ id }) => {
  const { user } = useAuth()
  const { dispatch, select } = useRedux()
  const { t } = useTranslation('comments')
  const openAuth = useOpenAuth()
  const {
    comments: { reply },
  } = select(videoPlaySelector)

  const postComment = async (content: string, formik?: TFormik) => {
    try {
      await commentsApi.post(id, { content, repliedCommentId: reply?.id })
      if (reply) dispatch(setReply(null))
      dispatch(getCommentsAsync(id))
      formik?.resetForm()
    } catch (e) {
      handleActionErrors({ e, dispatch, formik })
    } finally {
      formik?.setSubmitting(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: ({ content }) => {
      postComment(content, formik)
    },
  })

  return (
    <Wrapper onClick={() => openAuth?.()} id={COMMENT_INPUT}>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <Input
          formik={formik}
          placeholder={t('placeholder')}
          name="content"
          disabled={!!openAuth}
          iconButton={
            <SendButton isLoading={formik.isSubmitting} type="submit">
              <SendArrow color="accent300" />
            </SendButton>
          }
          additionalContent={{
            place: 'prepend',
            el: (
              <>
                <Avatar bordered={false} customSize={45} avatar={user?.profileImage} />
                {reply && (
                  <Reply onDelete={() => dispatch(setReply(null))} comment={reply} />
                )}
              </>
            ),
          }}
        />
      </form>
    </Wrapper>
  )
}
