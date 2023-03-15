import { intervalToDuration } from 'date-fns'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'

const timeIntervals: (keyof Duration)[] = [
  'seconds',
  'minutes',
  'hours',
  'days',
  'months',
  'years',
]

export const useTimeAgo = (createdAt?: number): string | null => {
  const [timeAgo, setTimeAgo] = useState<string | null>(null)
  const { t } = useTranslation('common')

  useEffect(() => {
    if (!createdAt) return
    const timeAgoObj = intervalToDuration({
      start: createdAt * 1000,
      end: new Date(),
    })
    timeIntervals.forEach((item) => {
      const time = timeAgoObj[item]
      if (time && time > 0) {
        if (time === 1) setTimeAgo(t(`time.${item}Ago1`, { time }))
        if (time > 1) setTimeAgo(t(`time.${item}Ago`, { time }))
      }
    })
  }, [createdAt])
  return timeAgo
}
