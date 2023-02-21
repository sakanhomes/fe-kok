import React from 'react'

import { useRouter } from 'next/router'

import { useToggle } from 'react-use'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { useTheme } from '@mui/material/styles'

import { Link } from '@/components/Link'

type ItemProps = {
  name: string
  href: string
  nestedItems: { name: string; href: string }[]
}

export const Item: React.FC<ItemProps> = ({ name, href, nestedItems }) => {
  const theme = useTheme()
  const router = useRouter()

  const [isOpen, toggleOpen] = useToggle(false)

  const handleClick = () => {
    if (nestedItems.length) {
      toggleOpen()
    } else {
      router.push(href)
    }
  }

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={name} />
        {Boolean(nestedItems.length) && (isOpen ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      <Collapse in={isOpen}>
        <List component="div" disablePadding sx={{ bgcolor: theme.palette.grey[200] }}>
          {nestedItems.map((item) => (
            <Link key={item.href} href={href + item.href}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Collapse>
    </>
  )
}
