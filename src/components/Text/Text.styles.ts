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
    font-weight: ${props.fontWeight};
  `

  const variantConfig: { [key in TVariant]: FlattenSimpleInterpolation } = {
    h1: css`
      font-size: 35px;
      line-height: 52px;
      letter-spacing: 0.5px;
      font-weight: 400;
    `,
    h2: css`
      font-size: 30px;
      line-height: 40px;
      letter-spacing: 0;
      font-weight: 700;
    `,
    h3: css`
      font-size: 30px;
      line-height: 40px;
      font-weight: 600;
    `,
    h4: css`
      font-weight: 600;
      font-size: 25px;
      line-height: 38px;
    `,
    h5: css`
      font-weight: 400;
      font-size: 23px;
      line-height: 36px;
    `,
    h6: css`
      font-weight: 600;
      font-size: 22px;
      line-height: 32px;
    `,
    h7: css`
      font-weight: 400;
      font-size: 20px;
      line-height: 20px;
    `,
    p1: css`
      font-weight: 500;
      font-size: 20px;
      line-height: 15px;
    `,
    p2: css`
      font-weight: 400;
      font-size: 18px;
      line-height: 27px;
    `,
    p3: css`
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    `,
    p4: css`
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      letter-spacing: 0.025em;
    `,
    l1: css`
      font-weight: 500;
      font-size: 17px;
      line-height: 20px;
    `,
    l2: css`
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    `,
  }

  return css`
    ${props.variant && variantConfig[props.variant]}
    ${baseStyles}
  `
})
