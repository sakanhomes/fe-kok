import { FC, useEffect } from 'react'
import { PageLoader } from '@/components/PageLoader'
import { useRedux } from '@/hooks/use-redux'
import { useAuth } from '@/hooks/use-auth'
import { actionsAsync } from '../auth/store'

export const InitUser: FC = () => {
  const { dispatch } = useRedux()
  const { userFetching } = useAuth()

  useEffect(() => {
    dispatch(actionsAsync.getProfileAsync())
  }, [])

  return userFetching ? <PageLoader /> : null
}
