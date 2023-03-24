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
  label,
  checked,
  variant = 'main',
  ...props
}) => (
  <>
    <S.Label notActive={disabled} htmlFor={id} className={className}>
      <input
        type={type}
        disabled={disabled}
        onChange={onChange}
        name={name}
        value={value}
        checked={type === 'radio' ? checked : !!value}
        id={id}
        {...props}
      />
      {variant === 'main' && (
        <CheckIcon checked={type === 'radio' ? !!checked : !!value} />
      )}
      {variant === 'secondary' && (
        <S.SecondaryCheckbox checked={type === 'radio' ? !!checked : !!value} />
      )}
      <div>{label}</div>
    </S.Label>
    {error && <S.ErrorComponent>{error}</S.ErrorComponent>}
  </>
)
