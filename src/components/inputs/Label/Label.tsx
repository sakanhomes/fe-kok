import useTranslation from 'next-translate/useTranslation'
import { TLabelProps } from '../types'
import * as S from './Label.styles'

export const Label: React.FC<TLabelProps> = ({
  label,
  error,
  children,
  htmlFor,
  className,
}) => {
  const { t } = useTranslation()
  return (
    <>
      {label && (
        <S.StyledLabel htmlFor={htmlFor} className={className}>
          <span>{label}</span>
        </S.StyledLabel>
      )}
      {children}
      {error && (
        <S.ErrorComponent>
          {error.includes('validation:') ? t(error) : error}
        </S.ErrorComponent>
      )}
    </>
  )
}
