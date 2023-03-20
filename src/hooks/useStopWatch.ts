import { useState, useEffect, Dispatch, SetStateAction } from 'react'

export const useTimer = (): {
  isRunning: boolean
  setIsRunning: Dispatch<SetStateAction<boolean>>
  elapsedTime: number
  setElapsedTime: Dispatch<SetStateAction<number>>
} => {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timer
    if (isRunning) {
      interval = setInterval(
        () => setElapsedTime((prevElapsedTime) => prevElapsedTime + 0.1),
        100
      )
    }
    return () => clearInterval(interval)
  }, [isRunning])

  return {
    isRunning,
    setIsRunning,
    elapsedTime,
    setElapsedTime,
  }
}

export const useStopwatch = (): {
  elapsedTime: string
  laps: number[]
  addLap: () => void
  resetTimer: () => void
  startTimer: () => void
  stopTimer: () => void
  isRunning: boolean
} => {
  const [laps, setLaps] = useState<number[]>([])
  const { isRunning, setIsRunning, elapsedTime, setElapsedTime } = useTimer()

  const handleReset = () => {
    setIsRunning(false)
    setElapsedTime(0)
    setLaps([])
  }

  const handleAddLap = () => {
    const prevTotal = laps.reduce((acc, curr) => acc + curr, 0)
    if (isRunning) setLaps([elapsedTime - prevTotal, ...laps])
  }

  return {
    elapsedTime: elapsedTime.toFixed(1),
    laps,
    addLap: () => handleAddLap(),
    resetTimer: () => handleReset(),
    startTimer: () => setIsRunning(true),
    stopTimer: () => setIsRunning(false),
    isRunning,
  }
}
