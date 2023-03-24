export type TParts = {
  [key in number]: 'created' | 'uploading' | 'uploaded' | 'failed'
}

export type TUploads<P = TParts> = {
  id: string
  type: 'single' | 'multipart'
  status: 'created' | 'uploading' | 'uploaded' | 'aborted' | 'completed' | 'failed'
  owner: string
  size: number
  chunkSize: number
  createdAt: number
  updatedAt: number
  lastChunkAt: number
  parts: P
}
