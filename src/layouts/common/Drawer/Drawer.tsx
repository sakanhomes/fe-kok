import React from 'react'
import MuiDrawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import { Item } from './components/Item'
import { MENU_ITEMS_LIST } from './constants'

const drawerWidth = 240

export const Drawer: React.FC = () => (
  <MuiDrawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    }}
    variant="permanent"
    anchor="left"
  >
    <Toolbar />
    <Divider />
    <List>
      {MENU_ITEMS_LIST.map(({ name, href, nestedItems }) => (
        <Item key={name} name={name} href={href} nestedItems={nestedItems} />
      ))}
    </List>
  </MuiDrawer>
)
