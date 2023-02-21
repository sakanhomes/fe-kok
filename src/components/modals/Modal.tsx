import { useEffect, useRef } from 'react'
import { useClickAway } from 'react-use'
import styled from 'styled-components'
import PopupComponent from 'reactjs-popup'
import Box from '@/styles/Box'

export const Popup = styled(PopupComponent)`
  &-overlay {
    overflow-y: auto;
    height: var(--window-height);
    overscroll-behavior: none;
    top: 0 !important;
  }

  &-content {
    width: 100%;
    padding: 40px;
  }
`

export const Container = styled.div<{ maxWidth?: number }>`
  width: 100%;
  max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : '500px')};
  background: tan;
  border-radius: 16px;
  height: 100px;
  margin: 0 auto;
  padding: 16px;
`
export const Close = styled.div``

export type TModalBase = {
  open: boolean
  onClose?: () => void
  maxWidth?: number
  className?: string
  loading?: string
  closeOutside?: boolean
  title: string
}

export const Modal: React.FC<TModalBase> = ({
  open,
  onClose,
  children,
  className,
  closeOutside,
  maxWidth,
  title,
}) => {
  const containerRef = useRef(null)

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

      hasScroll =
        elem.scrollHeight > elem.clientHeight + 1 && !isContainer && !isPopupContent

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
    if (active === true) {
      document.body.addEventListener('touchmove', touchmoveHandler, { passive: false })
      return
    }
    document.body.removeEventListener('touchmove', touchmoveHandler)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const { body } = document
    if (!open) {
      body.style.paddingRight = ''
      body.style.overflowY = 'auto'
      stopScroll(false)
      return
    }

    const scrollWidth = window.innerWidth - document.documentElement.clientWidth
    body.style.overflowY = 'hidden'

    stopScroll(true)

    if (scrollWidth === 0) return

    body.style.paddingRight = `${scrollWidth}px`
  }, [open])

  return (
    <Popup modal nested open={open} closeOnEscape closeOnDocumentClick onClose={onClose}>
      <Container ref={containerRef} className={className} maxWidth={maxWidth}>
        <Box>{title}</Box>
        {onClose && (
          <button type="button" onClick={onClose}>
            Close
          </button>
        )}
        {children}
      </Container>
    </Popup>
  )
}
