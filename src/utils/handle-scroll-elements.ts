import { LEYAOUT_CONTENT } from '@/constants/ids'

export const handleSrollEl = (id: string, offsetScroll: number): void => {
  const el = document.getElementById(id)
  const contEl = document.getElementById(LEYAOUT_CONTENT)
  if (!el || !contEl) return

  const y = el.getBoundingClientRect().top + contEl.scrollTop - offsetScroll
  contEl.scrollTo({ top: y, behavior: 'smooth' })
}
