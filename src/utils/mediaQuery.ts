export const screens = {
  XL: 1440,
  MD: 768,
}

export const mediaQuery = (key: keyof typeof screens): string =>
  `max-width: ${screens[key]}px`
