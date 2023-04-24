import { BaseButton } from '@/components/buttons/BaseButton'
import Box from '@/components/Box'
import { rgba } from 'emotion-rgba'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { ECategories } from '../../enums/categories'

const categories = [
  {
    label: 'all',
  },
  {
    label: 'web3',
    category: ECategories.WEB3,
  },
  {
    label: 'music',
    category: ECategories.MUSIC,
  },
  {
    label: 'art',
    category: ECategories.ART,
  },
  {
    label: 'eating',
    category: ECategories.EATING,
  },
  {
    label: 'travel',
    category: ECategories.TRAVEL,
  },
  {
    label: 'gaming',
    category: ECategories.GAMING,
  },
  {
    label: 'tech',
    category: ECategories.TECH,
  },
  {
    label: 'education',
    category: ECategories.EDUCATION,
  },
  {
    label: 'dance',
    category: ECategories.DANCE,
  },
  {
    label: 'lifestyle',
    category: ECategories.LIFESTYLE,
  },
  {
    label: 'animation',
    category: ECategories.ANIMATION,
  },
  {
    label: 'documentary',
    category: ECategories.DOCUMENTARY,
  },
  {
    label: 'animals',
    category: ECategories.ANIMALS,
  },
  {
    label: 'sports',
    category: ECategories.SPORTS,
  },
]

const Button = styled(BaseButton)<{ $active: boolean }>(({ $active, theme }) => {
  const activeCSS = css`
    background-color: ${theme.palette.accent300};
    font-weight: 600;
    color: ${theme.palette.secondary100};
  `
  const unactiveCSS = css`
    background-color: ${theme.palette.secondary300};
    font-weight: 300;
  `
  return css`
    padding: 0 10px;
    height: 40px;
    border-radius: 8px;
    box-shadow: 6px 6px 10px ${rgba(theme.palette.accent300, 0.2)};
    font-size: 16px;
    line-height: 24px;
    ${$active ? activeCSS : unactiveCSS};
  `
})

export const Categories: FC = () => {
  const { push, pathname, query } = useRouter()
  const { t } = useTranslation('home')

  return (
    <Box
      width="100%"
      overflowX="auto"
      display="flex"
      gridGap={10}
      paddingBottom={10}
      height="fit-content"
    >
      {categories.map(({ label, category }) => (
        <Button
          $active={category ? query.category === category : !query.category}
          onClick={() => push({ pathname, query: category ? { category } : undefined })}
          key={label}
        >
          {t(label)}
        </Button>
      ))}
    </Box>
  )
}
