import useTranslation from 'next-translate/useTranslation'
import { TLabelProps } from '../types'
import * as S from './Label.styles'

export const Label: React.FC<TLabelProps> = ({
  label,
  error,
  children,
  htmlFor,
  className,
  style,
}) => {
  const { t } = useTranslation()
  return (
    <>
      {label && (
        <S.StyledLabel style={style} htmlFor={htmlFor} className={className}>
          <S.LabelText>{label}</S.LabelText>
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
