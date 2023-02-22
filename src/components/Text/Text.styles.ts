import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { TText, TVariant } from '@/components/Text/Text'

export const StyledText = styled.div<TText>((props) => {
  const { palette } = props.theme

  const baseStyles = css`
    text-align: ${props.align};
    text-transform: ${props.textTransform};
    margin: ${props.margin};
    font-style: ${props.fontStyle};
    color: ${props.color ? palette[props.color] : palette.primary100};
  `

  const variantConfig: { [key in TVariant]: FlattenSimpleInterpolation } = {
    h1: css`
      ${baseStyles};
      font-size: 35px;
      line-height: 52px;
      letter-spacing: 0.5px;
      font-weight: 400;
    `,
    h2: css`
      ${baseStyles};
      font-size: 30px;
      line-height: 40px;
      letter-spacing: 0;
      font-weight: 700;
    `,
    h3: css`
      ${baseStyles};
      font-size: 30px;
      line-height: 40px;
      font-weight: 600;
    `,
    h4: css`
      ${baseStyles};
      font-weight: 600;
      font-size: 25px;
      line-height: 38px;
    `,
    h5: css`
      ${baseStyles};
      font-weight: 400;
      font-size: 23px;
      line-height: 36px;
    `,
    h6: css`
      ${baseStyles};
      font-weight: 600;
      font-size: 22px;
      line-height: 32px;
    `,
    p1: css`
      ${baseStyles};
      font-weight: 500;
      font-size: 20px;
      line-height: 15px;
    `,
    p2: css`
      ${baseStyles};
      font-weight: 400;
      font-size: 18px;
      line-height: 27px;
    `,
    p3: css`
      ${baseStyles};
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    `,
    l1: css`
      ${baseStyles};
      font-weight: 500;
      font-size: 17px;
      line-height: 20px;
    `,
    l2: css`
      ${baseStyles};
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    `,
  }

  return css`
    ${baseStyles}
    ${props.variant && variantConfig[props.variant]}
  `
})
