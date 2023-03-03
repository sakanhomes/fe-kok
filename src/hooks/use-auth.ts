import { actionsAsync, selectors, TInit } from 'store/auth'
import { useRedux } from '@/hooks/use-redux'

type TUseProfileData = TInit & {
  logout: () => void
  logoutAsync: () => void
}

export const useAuth = (): TUseProfileData => {
  const { select, dispatch } = useRedux()
  const auth = select(selectors.authSelector)
  const logout = () => dispatch(actionsAsync.logout())
  const logoutAsync = () => dispatch(actionsAsync.logoutAsync())

  return { ...auth, logout, logoutAsync }
}
