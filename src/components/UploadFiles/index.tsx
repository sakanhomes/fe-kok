import Box from '@/components/Box'
import { IPalette } from '@/styles/styled'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, ReactNode } from 'react'
import { DropzoneState, useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { BaseButton } from '../buttons/BaseButton'
import { File } from '../icons/File'
import { Text } from '../Text'

const Wrapper = styled(Box)<{ bg?: string; borderColor?: keyof IPalette }>`
  border-radius: 20px;
  background: ${({ theme, bg }) => bg ?? theme.palette.accent400};
  border: 2px dashed
    ${({ theme, borderColor }) =>
      borderColor ? theme.palette[borderColor] : theme.palette.primary600};
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`

const DividerBox = styled(Box)`
  ::before,
  ::after {
    display: block;
    content: '';
    width: 75px;
    height: 1px;
    background-color: ${({ theme }) => theme.palette.primary500};
  }
`

const Button = styled(BaseButton)`
  height: 56px;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.palette.accent300};
  border-radius: 15px;
`

export const UploadFiles: FC<{
  onDropAccepted: (file: File) => void
  className?: string
  type?: 'video' | 'images'
  customContent?: (props: DropzoneState) => ReactNode
  bg?: string
  borderColor?: keyof IPalette
  noClick?: boolean
  noKeyboard?: boolean
}> = ({
  onDropAccepted,
  borderColor,
  className,
  type,
  customContent,
  bg,
  noClick = true,
  noKeyboard = true,
}) => {
  const dropzone = useDropzone({
    noClick,
    noKeyboard,
    accept:
      type === 'images'
        ? {
            'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
          }
        : {
            'video/mp4': ['.mp4', '.MP4'],
          },
    onDropAccepted: (files) => {
      onDropAccepted(files[0])
    },
  })
  const { t } = useTranslation('upload')

  return (
    <Wrapper
      borderColor={borderColor}
      bg={bg}
      width="100%"
      className={className}
      {...dropzone.getRootProps()}
    >
      <input type="file" {...dropzone.getInputProps()} />
      {customContent?.(dropzone) ?? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="776px"
          padding="50px"
        >
          <File color="accent300" />
          <Text variant="h5" margin="18px 0 0">
            {t('dropTitle')}
          </Text>
          <DividerBox
            marginY="35px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gridGap="14px"
          >
            <Text variant="h5" color="primary500">
              {t('or')}
            </Text>
          </DividerBox>
          <Button onClick={dropzone.open}>
            <Text variant="h5" fontWeight={500} color="secondary100">
              {t('browseFiles')}
            </Text>
          </Button>
        </Box>
      )}
    </Wrapper>
  )
}
