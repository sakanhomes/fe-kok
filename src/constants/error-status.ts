export const ERROR_STATUS = {
  SERVER: 500,
  VALIDATION: 422,
  MESSAGE: 400,
  NOTFOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
} as const

export const ERROR_MESSAGE = {
  NETWORK: 'Network Error',
}
