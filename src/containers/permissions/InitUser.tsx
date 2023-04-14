import { FC, useEffect } from 'react'
import { useRedux } from '@/hooks/use-redux'
import { useAuth } from '@/hooks/use-auth'
import { GlobalLoader } from '@/components/loaders/GlobalLoader'
import { actionsAsync } from '../../store/auth'

export const InitUser: FC = () => {
  const { dispatch } = useRedux()
  const { globalFetching } = useAuth()

  useEffect(() => {
    dispatch(actionsAsync.getProfileAsync())
  }, [])

  return globalFetching ? <GlobalLoader /> : null
}
