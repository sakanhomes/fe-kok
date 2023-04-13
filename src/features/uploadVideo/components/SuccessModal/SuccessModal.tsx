import { BaseButton } from '@/components/buttons/BaseButton'
import { Text } from '@/components/Text'
import { APP_URL } from '@/constants/config'
import Box from '@/components/Box'
import { TOwnerVideo } from '@/types/video'
import { format } from 'date-fns'
import { rgba } from 'emotion-rgba'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components'

const VideoWrapper = styled(Box)`
  border-radius: 10px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.secondary300};
`

const ImageWrapper = styled(Box)<{ img: string }>`
  background-image: url(${({ img }) => img});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`

const Duration = styled(Box)`
  background-color: ${({ theme }) => rgba(theme.palette.primary100, 0.75)};
  border-radius: 4px;
`

export const SuccessModal: FC<TOwnerVideo> = ({
  previewImage,
  duration,
  title,
  id,
  createdAt,
}) => {
  const { t } = useTranslation('upload')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 3000)
  }, [copied])

  return (
    <Box width={817}>
      <Text variant="h5" tag="h2">
        {t('videoUploaded')}
      </Text>
      <VideoWrapper
        height={187}
        marginTop={50}
        marginBottom={20}
        gridGap={32}
        display="grid"
        position="relative"
        gridTemplateColumns="1fr 2fr"
      >
        <ImageWrapper position="relative" img={previewImage}>
          <Duration
            position="absolute"
            padding=" 2px 5px"
            bottom="5px"
            right="10px"
            zIndex="1"
          >
            <Text color="secondary100" variant="l2">
              {duration}
            </Text>
          </Duration>
        </ImageWrapper>
        <Box marginTop={32}>
          <Text margin="0 0 15px" variant="h5">
            {title}
          </Text>
          <Text variant="l1">
            {t('published')} {format(createdAt * 1000, 'MMM dd,yyyy')}
          </Text>
        </Box>
      </VideoWrapper>
      <VideoWrapper
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="10px"
      >
        <Box>
          <Text margin="0 0 10px">{t('videoLink')}</Text>
          <Text color="accent200">
            {APP_URL}
            video/
            {id}
          </Text>
        </Box>
        <BaseButton
          onClick={() => {
            navigator.clipboard.writeText(`${APP_URL}video/${id}`)
            setCopied(true)
          }}
          color="accent200"
        >
          {copied ? t('common:copied') : t('common:copy')}
        </BaseButton>
      </VideoWrapper>
    </Box>
  )
}
