import { AxiosResponse } from 'axios'

export type TAxiosResponse<T> = Promise<AxiosResponse<T>>
