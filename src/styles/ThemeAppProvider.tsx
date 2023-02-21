import React, { createContext, useMemo, useState } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { useRouter } from 'next/router'
import { theming, TTheme } from '@/styles/theme'

export const ThemeContext = createContext<{
  theme: DefaultTheme
  setTheme: (t: TTheme) => void
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ theme: theming.dark, setTheme: () => {} })

export const ThemeAppProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<TTheme | null>(null)
  const router = useRouter()

  const setThemeToggle = (t: TTheme) => setTheme(t)

  const themeConfig = useMemo(() => theming.dark, [theme, router])

  const themeContext = useMemo(
    () => ({ theme: themeConfig, setTheme: setThemeToggle }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={themeContext}>
      <ThemeProvider theme={themeConfig}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
