import { BaseButton } from '@/components/buttons/BaseButton'
import { FC } from 'react'
import styled from 'styled-components'

const Button = styled(BaseButton)`
  display: flex;
  grid: 10px;
  align-items: center;
  height: 33px;
  width: fit-content;
  font-weight: 500;
  font-size: 17px;
  line-height: 13px;
  margin-bottom: 42px;
`

export const TabLink: FC<{ onClick: () => void; disabled: boolean }> = ({
  children,
  onClick,
  disabled,
}) => (
  <Button onClick={onClick} disabled={disabled}>
    {children}
    {!disabled && <span>{'>'}</span>}
  </Button>
)
