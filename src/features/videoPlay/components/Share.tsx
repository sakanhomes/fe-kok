import { BaseButton } from '@/components/buttons/BaseButton'
import { ShareIcon } from '@/components/icons/ShareIcon'
import { Input } from '@/components/inputs/Input'
import { Modal } from '@/components/modals/Modal'
import { Text } from '@/components/Text'
import { APP_URL } from '@/constants/config'
import Box from '@/components/Box'
import useTranslation from 'next-translate/useTranslation'
import { FC, useEffect, useState } from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'

export const Share: FC<{ id: string; preview: string }> = ({ id, preview }) => {
  const [openModal, setOpenModal] = useState(false)
  const { t } = useTranslation('common')
  const [copied, setCopied] = useState(false)

  const link = `${APP_URL}video/${id}`

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 3000)
  }, [copied])

  return (
    <>
      <BaseButton onClick={() => setOpenModal(true)}>
        <ShareIcon variant={2} color="accent300" />
      </BaseButton>
      <Modal
        padding="40px 30px"
        maxWidth="550px"
        onClose={() => setOpenModal(false)}
        open={openModal}
      >
        <Box
          height={40}
          gridGap={20}
          marginBottom={20}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FacebookShareButton url={link}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <TwitterShareButton url={link}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <PinterestShareButton media={preview} url={link}>
            <PinterestIcon size={40} round />
          </PinterestShareButton>
        </Box>
        <Input
          name="copy_address"
          readOnly
          value={link}
          additionalContent={{
            place: 'append',
            el: (
              <BaseButton
                onClick={() => {
                  navigator.clipboard.writeText(link)
                  setCopied(true)
                }}
              >
                <Text variant="l2" fontWeight={600} color="accent300">
                  {copied ? t('copied') : t('copy')}
                </Text>
              </BaseButton>
            ),
          }}
        />
      </Modal>
    </>
  )
}
