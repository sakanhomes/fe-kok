import { API_UPLOAD_URL } from '@/constants/config'
import { TUploads } from '@/types/uploads'
import { api, cancelTokenSource } from './instance'
import { TAxiosResponse } from './types'

export type TMultipartReq = {
  name: string
  size: number
}

export type TUploadSingleReq = {
  body: File
} & Omit<TMultipartReq, 'size'>

export type TUploadPartReq = {
  id: string
  part: number
  body: Blob
}

const get = (): TAxiosResponse<{
  status: number
  data: { upload: TUploads[] }
}> => api.get(`${API_UPLOAD_URL}uploads`)

const getById = (
  id: string
): TAxiosResponse<{
  status: number
  data: { upload: TUploads }
}> => api.get(`${API_UPLOAD_URL}uploads/${id}`)

const createMultipart = (
  params: TMultipartReq
): TAxiosResponse<{
  status: number
  data: { upload: TUploads }
}> =>
  api.post(`${API_UPLOAD_URL}uploads`, params, { cancelToken: cancelTokenSource.token })

const uploadSingle = ({
  name,
  body,
}: TUploadSingleReq): TAxiosResponse<{
  status: number
  data: { upload: TUploads<null> }
}> =>
  api.post(`${API_UPLOAD_URL}uploads/single?name=${name}`, body, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  })

const uploadPart = ({
  id,
  part,
  body,
}: TUploadPartReq): TAxiosResponse<{
  status: number
  data: { upload: TUploads }
}> =>
  api.post(`${API_UPLOAD_URL}uploads/${id}?part=${part}`, body, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    cancelToken: cancelTokenSource.token,
  })

const complete = ({
  id,
}: Pick<TUploadPartReq, 'id'>): TAxiosResponse<{
  status: number
  data: { upload: TUploads }
}> => api.post(`${API_UPLOAD_URL}uploads/${id}/complete`)

const abort = ({
  id,
}: Pick<TUploadPartReq, 'id'>): TAxiosResponse<{
  status: number
}> => api.post(`${API_UPLOAD_URL}uploads/${id}/abort`)

export const uploadsApi = {
  get,
  getById,
  createMultipart,
  uploadSingle,
  uploadPart,
  complete,
  abort,
}
