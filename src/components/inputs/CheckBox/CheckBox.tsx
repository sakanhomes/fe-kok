import { CheckIcon } from '@/components/icons/CheckIcon'
import { TCheckBoxProps } from '../types'
import * as S from './CheckBox.styles'

export const CheckBox: React.FC<TCheckBoxProps> = ({
  disabled,
  type,
  onChange,
  name = '',
  value,
  error,
  id,
  className,
  checked,
  label,
  ...props
}) => (
  <>
    <S.Label notActive={disabled} htmlFor={id} className={className}>
      <input
        tabIndex={0}
        type={type}
        disabled={disabled}
        onChange={onChange}
        name={name}
        value={value}
        checked={checked}
        id={id}
        {...props}
      />
      <CheckIcon checked={!!value} />
      <div>{label}</div>
    </S.Label>
    {error && <S.ErrorComponent>{error}</S.ErrorComponent>}
  </>
)
