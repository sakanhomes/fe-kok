import { ERROR_STATUS } from '@/constants/error-status'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import { handleActionErrors } from '@/utils/handleActionErrors'
import axios from 'axios'
import React, { FC, useEffect, useRef, useState } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import styled from 'styled-components'
import { Text } from '../Text'

const ErrorWrapper = styled(Box)`
  transform: translate(-50%, -50%);
  text-align: center;
`

const Player = styled(ReactPlayer)`
  background-color: ${({ theme }) => theme.palette.primary200};
`

export const VideoPlayer: FC<
  Omit<ReactPlayerProps, 'url'> & { preview?: boolean; url: string }
> = ({ preview, ...props }) => {
  const playerRef = useRef(null)
  const [videoError, setVideoError] = useState('')
  const { dispatch } = useRedux()
  const previewOptions: ReactPlayerProps = preview
    ? {
        muted: true,
        playing: true,
        loop: true,
        controls: false,
      }
    : {}

  useEffect(() => {
    const existingVideoAsync = async () => {
      try {
        await axios.head(props.url)
      } catch (e) {
        handleActionErrors({
          e,
          dispatch,
          additionalConditions: (status) => {
            if (status === ERROR_STATUS.FORBIDDEN) {
              setVideoError(
                "You don't have access to this video or the video does not exist"
              )
            }
            return true
          },
        })
      }
    }
    existingVideoAsync()
  }, [])

  return (
    <Box position="relative">
      <Player
        ref={playerRef}
        controls
        {...previewOptions}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
              autoPlay: true,
              muted: true,
            },
          },
        }}
        light={preview ? undefined : props.light}
        {...props}
        style={{
          borderRadius: '6px',
          overflow: 'hidden',
          objectFit: 'cover',
          ...props.style,
        }}
        width="100%"
        height="100%"
        onError={() =>
          setVideoError("You don't have access to this video or the video does not exist")
        }
      />
      <ErrorWrapper position="absolute" top="50%" maxWidth="50%" left="50%">
        <Text color="danger100" lineHeight="30px" variant="p1">
          {videoError}
        </Text>
      </ErrorWrapper>
    </Box>
  )
}
