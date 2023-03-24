import { FormikSelect } from '@/components/inputs/FormikSelect'
import { Text } from '@/components/Text'
import { VideoPlayer } from '@/components/VideoPlayer'
import { useRedux } from '@/hooks/use-redux'
import Box from '@/styles/Box'
import { validation } from '@/utils/validation'
import { useFormik } from 'formik'
import React, { FC, useEffect } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import styled, { useTheme } from 'styled-components'
import * as yup from 'yup'
import { categoriesOptions } from '@/constants/select-options'
import { FormikInput } from '@/components/inputs/FormikInput'
import { UploadFiles } from '@/components/UploadFiles'
import { UploadIcon3 } from '@/components/icons/UploadIcon3'
import { BaseButton } from '@/components/buttons/BaseButton'
import { FormikCheckbox } from '@/components/inputs/FormikCheckbox'
import { rgba } from 'emotion-rgba'
import { ECategories } from '@/features/home/enums/categories'
import useTranslation from 'next-translate/useTranslation'
import {
  createVideoAsync,
  getUploadAsync,
  setStep,
  setVideoClosed,
  setVideoData,
  singleUploadAsync,
  TVideoData,
  uploadVideoSelector,
} from '../../store/uploadVideo'

const TitleWrapper = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.primary100};
`

const ProgressbarWrapper = styled(Box)`
  transform: translate(-50%, -50%);
`

const Button = styled(BaseButton)`
  height: 46px;
  color: ${({ theme }) => theme.palette.secondary100};
  font-size: 24px;
  width: 100%;
  justify-content: center;
  font-weight: 500;
  box-shadow: 0px 4px 4px ${({ theme }) => rgba(theme.palette.primary100, 0.25)};
  border-radius: 10px;
`

const UploadButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.accent300};
`
const BackButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.secondary200};
`

const Duration = styled(Box)`
  background-color: ${({ theme }) => rgba(theme.palette.primary100, 0.75)};
  border-radius: 4px;
`

export const UploadVideoForm: FC<{ videoData: TVideoData }> = ({ videoData }) => {
  const { dispatch, select } = useRedux()
  const { thumbnail, uploadVideoComplete, uploads, localImage, completedPercentage } =
    select(uploadVideoSelector)
  const theme = useTheme()

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(getUploadAsync())
    }, 2000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  const { t } = useTranslation('upload')

  const formik = useFormik({
    initialValues: {
      category: undefined,
      isPublic: '',
      title: '',
      description: '',
    },
    validationSchema: yup.object().shape({
      category: validation.required,
      isPublic: validation.required,
      title: validation.required,
      description: validation.required,
    }),
    onSubmit: (formData) => {
      if (videoData.duration && uploads && thumbnail)
        dispatch(
          createVideoAsync(
            {
              title: formData.title,
              description: formData.description,
              isPublic: formData.isPublic === 'public',
              category: formData.category as unknown as ECategories,
              duration: videoData.duration,
              videoUploadId: uploads.id,
              previewUploadId: thumbnail.id,
            },
            () => dispatch(setStep('success'))
          )
        )
    },
  })

  return (
    <Box as="form" onSubmit={formik.handleSubmit} width={1117}>
      <TitleWrapper padding="0 50px" display="flex" alignItems="center" minHeight={61}>
        <Text variant="h5" tag="h2">
          {formik.values.title ?? t('videoTitle')}
        </Text>
      </TitleWrapper>
      <Box
        display="grid"
        padding="48px 50px 28px"
        gridGap={48}
        gridTemplateColumns="1fr 1fr"
      >
        <Box>
          <Box height="284px" maxWidth="100%" position="relative">
            <VideoPlayer
              onDuration={(d: number) =>
                dispatch(
                  setVideoData({
                    ...videoData,
                    duration: Math.round(d),
                  })
                )
              }
              url={videoData.localLink}
              controls={false}
            />
            {videoData.duration && (
              <Duration
                position="absolute"
                padding=" 2px 5px"
                bottom="5px"
                right="10px"
                zIndex="1"
              >
                <Text color="secondary100" variant="l2">
                  {`${(videoData.duration / 60).toFixed(0).padStart(2, '0')}:${(
                    videoData.duration % 60
                  )
                    .toString()
                    .padStart(2, '0')}`}
                </Text>
              </Duration>
            )}
            <ProgressbarWrapper maxWidth={217} position="absolute" top="50%" left="50%">
              <CircularProgressbar
                value={completedPercentage}
                text={`${completedPercentage}%`}
                strokeWidth={4}
                styles={buildStyles({
                  textSize: '20px',
                  pathTransitionDuration: 0.5,
                  pathColor: theme.palette.success100,
                  textColor: theme.palette.secondary100,
                  trailColor: theme.palette.secondary100,
                })}
              />
            </ProgressbarWrapper>
          </Box>
          <Box
            margin="16px 0 23px"
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            gridGap={15}
          >
            <Text variant="p2" color="primary200">
              {videoData.name}
            </Text>
            <Text variant="p2" color="primary400">
              {(videoData.size / (1024 * 1024)).toFixed(2)} MB
            </Text>
          </Box>
          <Box marginBottom={41}>
            <Text margin="0 0 5px">{t('category')}</Text>
            <FormikSelect
              formik={formik}
              name="category"
              options={categoriesOptions}
              label={{ label: 'Add your video to a category' }}
            />
          </Box>
          <Box>
            <FormikInput
              formik={formik}
              name="title"
              textarea
              height={84}
              placeholder={t('titleRequired')}
            />
          </Box>
        </Box>
        <Box>
          <FormikInput
            formik={formik}
            name="description"
            textarea
            height={180}
            placeholder={t('description')}
          />
          <Box margin="34px 0 40px">
            <UploadFiles
              type="images"
              noClick={false}
              noKeyboard={false}
              onDropAccepted={(file) =>
                dispatch(singleUploadAsync(file.name, file, 'image'))
              }
              bg={`url(${localImage})` ?? theme.palette.secondary100}
              customContent={
                <Box
                  height={203}
                  gridGap={12}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  bg={rgba(theme.palette.secondary100, 0.5)}
                >
                  <UploadIcon3 color="primary500" />
                  <Text>{t('uploadThumbnail')}</Text>
                </Box>
              }
            />
          </Box>
          <Box display="grid" gridTemplateColumns="2fr 1fr" gridGap={36}>
            <Box display="flex" flexDirection="column" gridGap={19}>
              <FormikCheckbox
                type="radio"
                name="isPublic"
                value="private"
                formik={formik}
                variant="main"
                label={
                  <Box>
                    <Text variant="l1">{t('private')}</Text>
                    <Text variant="l2">{t('privateDescr')}</Text>
                  </Box>
                }
              />
              <FormikCheckbox
                type="radio"
                name="isPublic"
                value="public"
                formik={formik}
                variant="main"
                label={
                  <Box>
                    <Text variant="l1">{t('public')}</Text>
                    <Text variant="l2">{t('publicTitle')}</Text>
                  </Box>
                }
              />
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="space-between">
              <UploadButton
                type="submit"
                disabled={!formik.dirty && !thumbnail && !uploadVideoComplete}
              >
                {t('upload')}
              </UploadButton>
              <BackButton onClick={() => dispatch(setVideoClosed('back'))}>
                {t('back')}
              </BackButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
