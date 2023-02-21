type TIsClient = () => boolean

export const isClient: TIsClient = () => process.browser
