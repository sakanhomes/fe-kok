declare module 'axios' {
  interface AxiosStatic {
    isAxiosError<T = any>(payload: any): payload is AxiosError<T>
  }
}

export {}
