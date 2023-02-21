import { useState, useEffect } from 'react'

type FormattedRemainingTime = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export const formatRemainingTime = (
  countDownInSeconds: number
): FormattedRemainingTime => {
  const countdownInMs = countDownInSeconds * 1000

  const days = Math.floor(countdownInMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((countdownInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((countdownInMs % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countdownInMs % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
}

type TCoundown = (seconds: number) => {
  isEnd: boolean
  timeRemaining: { days: number; hours: number; minutes: number; seconds: number }
  reset: () => void
}

export const useCountdown: TCoundown = (secondsToEnd) => {
  const [countDown, setCountDown] = useState(secondsToEnd)

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown === 0) {
        clearInterval(interval)
      } else {
        setCountDown(countDown - 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [countDown])

  return {
    isEnd: countDown <= 0,
    timeRemaining: formatRemainingTime(countDown),
    reset: () => {
      setCountDown(secondsToEnd)
    },
  }
}
