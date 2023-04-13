import { VideoCard } from '@/components/VideoCard'
import Box from '@/components/Box'
import { TOwnerPlaylist } from '@/types/playlists'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect } from 'react'
import { TFormik } from '@/types/formik'
import { useCollection } from '../../hooks/useCollection'
import { Title } from '../../components/Title'

export const Collection: FC<{
  data: TOwnerPlaylist
  searchForm: {
    value: string
    formik?: TFormik
  } | null
}> = ({ data, searchForm }) => {
  const { collection, setCollection } = useCollection(data)
  const { t } = useTranslation('settings')

  useEffect(() => {
    if (searchForm) setCollection(searchForm.value, searchForm.formik)
  }, [searchForm])

  return (
    <>
      <Title>{t('collection')}</Title>
      <Box
        marginTop={18}
        display="grid"
        gridGap={20}
        gridTemplateColumns="repeat(4, 1fr)"
      >
        {collection.videos.map((item) => (
          <VideoCard uniqId={`${item.id}_favorites`} {...item} key={item.id} />
        ))}
      </Box>
    </>
  )
}
