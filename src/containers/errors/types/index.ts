import { ERROR_STATUS } from '@/constants/error-status'

export type TPageError = typeof ERROR_STATUS.NOTFOUND | typeof ERROR_STATUS.SERVER | null
