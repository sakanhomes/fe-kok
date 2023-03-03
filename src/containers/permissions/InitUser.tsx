import { FC, useEffect } from 'react'
import { useRedux } from '@/hooks/use-redux'
import { actionsAsync } from '../../store/auth'

export const InitUser: FC = () => {
  const { dispatch } = useRedux()

  useEffect(() => {
    dispatch(actionsAsync.getProfileAsync())
  }, [])

  return null
}
