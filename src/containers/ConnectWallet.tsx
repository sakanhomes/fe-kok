import { useOpenAuth } from '@/hooks/use-open-auth'

type TProps = {
  target: (onClick: () => void) => JSX.Element
  onClick?: () => void
}

export const ConnectWallet: React.FC<TProps> = ({ target, onClick }) => {
  const openAuth = useOpenAuth()

  const handleClick = () => {
    if (openAuth) return openAuth()
    onClick?.()
  }

  return <>{target(handleClick)}</>
}
