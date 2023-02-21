import { NextRouter, useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type TUseHydrate = {
  hydration: boolean
  router: NextRouter
}

export const useHydrate = (): TUseHydrate => {
  const router = useRouter()
  const [hydration, sethydration] = useState(true)

  useEffect(() => {
    if (router.isReady) {
      sethydration(false)
    }
  }, [router])

  return { hydration, router }
}
