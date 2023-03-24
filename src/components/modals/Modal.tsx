import { useEffect, useRef, useState } from 'react'
import { useClickAway, useUnmount } from 'react-use'
import { CSSProperties } from 'styled-components'
import { CloseIcon } from '../icons/CloseIcon'
import { Text } from '../Text'
import * as S from './styled'

export type TModalBase = {
  open: boolean
  onClose?: () => void
  maxWidth?: string
  className?: string
  loading?: string
  closeOutside?: boolean
  title?: string
  withCloseButton?: boolean
  padding?: CSSProperties['padding']
}
export const Modal: React.FC<TModalBase> = ({
  open,
  onClose,
  children,
  className,
  closeOutside,
  maxWidth,
  title,
  padding,
  withCloseButton = true,
}) => {
  const [isClient, setIsClient] = useState(false)

  const containerRef = useRef(null)

  useEffect(() => setIsClient(true), [])

  useClickAway(containerRef, () => {
    if (!onClose || !closeOutside) return
    onClose()
  })

  function touchmoveHandler(e: Event) {
    const rootEl = document.getElementById('popup-root')
    let elem = e.target as HTMLElement
    let hasScroll = false
    while (!hasScroll && elem !== rootEl) {
      if (!elem) return
      const isContainer = containerRef.current === elem
      const isPopupContent = elem.classList.contains('popup-content')
      hasScroll = elem.scrollHeight > elem.clientHeight && !isContainer && !isPopupContent
      if (hasScroll) {
        elem.style.overscrollBehavior = 'none'
      }
      if (!elem.parentElement) return
      elem = elem.parentElement
    }
    if (hasScroll) return
    e.preventDefault()
  }

  function stopScroll(active: boolean) {
    const { body } = document
    if (active === true) {
      const scrollWidth = window.innerWidth - document.documentElement.clientWidth
      body.style.overflowY = 'hidden'
      document.body.addEventListener('touchmove', touchmoveHandler, { passive: false })
      if (scrollWidth === 0) return
      body.style.paddingRight = `${scrollWidth}px`
      return
    }
    body.style.paddingRight = ''
    body.style.overflowY = 'auto'
    document.body.removeEventListener('touchmove', touchmoveHandler)
  }

  useEffect(() => {
    if (!open) {
      stopScroll(false)
      return
    }
    stopScroll(true)
  }, [open])

  useUnmount(() => stopScroll(false))

  if (!isClient) return null

  return (
    <S.Popup modal nested open={open} onClose={onClose}>
      <S.Container
        padding={padding}
        ref={containerRef}
        className={className}
        maxWidth={maxWidth}
      >
        {title && (
          <Text variant="h7" tag="h2" margin="0 0 26px">
            {title}
          </Text>
        )}
        {onClose && withCloseButton && (
          <S.Close onClick={onClose}>
            <CloseIcon />
          </S.Close>
        )}
        {children}
      </S.Container>
    </S.Popup>
  )
}
