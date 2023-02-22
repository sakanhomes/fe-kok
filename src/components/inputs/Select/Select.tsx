import useTranslation from 'next-translate/useTranslation'
import React, { FC, useState } from 'react'
import { DropdownIndicatorProps, components } from 'react-select'
import styled, { useTheme } from 'styled-components'
import { Arrow } from '@/components/icons/Arrow'
import { ISelectProps } from './types'
import * as S from './Select.styles'

const Wrapper = styled.div<{ zIndex?: number }>`
  position: relative;
  z-index: ${({ zIndex }) => zIndex};
`

const DropdownIndicator: FC<DropdownIndicatorProps> = (props) => (
  <components.DropdownIndicator {...props}>
    <Arrow />
  </components.DropdownIndicator>
)

export const Select: FC<ISelectProps> = (props) => {
  const theme = useTheme()
  const { t } = useTranslation('common')
  const [open, setOpen] = useState(false)
  const { zIndex } = props

  return (
    <Wrapper zIndex={zIndex}>
      <S.StyledSelect
        classNamePrefix="Select"
        hideSelectedOptions
        {...props}
        components={{ DropdownIndicator }}
        theme={theme}
        onMenuOpen={() => setOpen(true)}
        onMenuClose={() => setOpen(false)}
        menuIsOpen={open}
        tabIndex={0}
        noOptionsMessage={() => t('noOptions')}
      />
    </Wrapper>
  )
}
