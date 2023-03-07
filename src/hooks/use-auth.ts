import { actionsAsync, selectors, TInit } from 'store/auth'
import { useRedux } from '@/hooks/use-redux'
import { useAccount } from 'wagmi'

type TUseProfileData = TInit & {
  logout: () => void
  logoutAsync: () => void
  address?: `0x${string}`
}

export const useAuth = (): TUseProfileData => {
  const { address } = useAccount()
  const { select, dispatch } = useRedux()
  const auth = select(selectors.authSelector)
  const logout = () => dispatch(actionsAsync.logout())
  const logoutAsync = () => dispatch(actionsAsync.logoutAsync())

  return { ...auth, logout, logoutAsync, address }
}
